import { Page } from 'playwright';
import { DataFactory } from '../../utils/dataFactory';
import { PlaywrightConfig } from './../../utils/playwrightConfig';
import { Url } from '../../data/enum/Urls';
import { HeaderLocators } from '../../locators/headerLocator';

export class PageHelper {
    private page: Page = undefined as unknown as Page;
    private playwrightConfig: PlaywrightConfig;
    private dataFactory: DataFactory;

    constructor() {
        this.playwrightConfig = PlaywrightConfig.getInstance();
        this.dataFactory = DataFactory.getInstance();
    }

    public async verifyUserIsLoggedIn(): Promise<boolean> {
        this.page = await this.playwrightConfig.getPage();
        const userName = this.dataFactory.getData().loginData.userDetails.userName;
        
        await this.urlNavigate(Url.BASEURL);
        //wait for the page to load
       await this.page.waitForTimeout(3000);
        const loginVisible = await this.page.isVisible(HeaderLocators.LOGIN);
        const usernameVisible = await this.page.isVisible(`${HeaderLocators.USERNAME}:has-text("${userName}")`);

        return usernameVisible ? true : loginVisible ? false : (() => { throw new Error("Unable to determine user login status. Neither login nor username is visible."); })();
    }

    public async urlNavigate(turl: string): Promise<void> {
        this.page = await this.playwrightConfig.getPage();
    
        // Normalize URLs to remove trailing slash for comparison
        const currentUrl = this.page.url().replace(/\/$/, "");
        const targetUrl = (turl === Url.BASEURL ? Url.BASEURL : Url.BASEURL + turl).replace(/\/$/, "");
        
        if (currentUrl !== targetUrl) {
            //await this.page.goto(url);
            // Use history.pushState to navigate without reloading the page
            await this.page.evaluate((url) => {
                window.history.pushState({}, "", url);
                window.dispatchEvent(new PopStateEvent("popstate"));
            }, turl);
        }
        await this.page.waitForTimeout(1000);
    }

    public async waitForApiResponse(apiEndpoint: string, expectedStatus: number = 200, timeout: number = 30000): Promise<any> {
        this.page = await this.playwrightConfig.getPage();
        try {
            const response = await this.page.waitForResponse(
                (response) =>
                    response.url().includes(apiEndpoint) && response.status() === expectedStatus,
                { timeout }
            );

            // Check the response type and handle accordingly
            const contentType = response.headers()['content-type'] || '';
            if (contentType.includes('application/json')) {
                return await response.json();
            } else {
                console.warn(`Response for ${apiEndpoint} is not JSON. Returning raw text.`);
                return await response.text();
            }
        } catch (error) {
            throw new Error(`API response not received or failed for ${apiEndpoint}: ${error}`);
        }
    }

}
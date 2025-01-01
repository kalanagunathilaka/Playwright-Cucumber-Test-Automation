import { Page } from 'playwright';
import { DataFactory } from '../../utils/dataFactory';
import { PlaywrightConfig } from './../../utils/playwrightConfig';

export class PageHelper {
    private page: Page = undefined as unknown as Page;
    private playwrightConfig: PlaywrightConfig;
    private dataFactory: DataFactory;

    constructor() {
        this.playwrightConfig = PlaywrightConfig.getInstance();
        this.dataFactory = DataFactory.getInstance();
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
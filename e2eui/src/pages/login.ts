import { data } from './../../../e2eapi/src/data/factoryData/data';
import { PlaywrightConfig } from './../utils/playwrightConfig';
import { Page } from 'playwright';
import { DataFactory } from './../utils/dataFactory';
import { Url } from '../data/enum/Urls';
import { expect } from 'playwright/test';
import { LoginLocators } from '../locators/loginLocator';
import { HeaderLocators } from '../locators/headerLocator';


export class Login {
    private page: Page = undefined as unknown as Page;
    private playwrightConfig: PlaywrightConfig;
    private dataFactory: DataFactory;

    constructor() {
        this.playwrightConfig = PlaywrightConfig.getInstance();
        this.dataFactory = DataFactory.getInstance();
    }

    public async login(): Promise<void> {
        if (this.dataFactory.getData().loginData.isLoggedIn) {
            console.log('User is already logged in skipping login');
            return;
        }
        await this.verifyLoginPage();
        await this.loginWithValidCredentials();
        await this.verifyLoggedInSuccessfully();
    }

    public async verifyLoginPage(): Promise<void> {
        this.page = await this.playwrightConfig.getPage();

        await this.page.goto(Url.LOGIN);
        await Promise.all([
            expect(this.page.locator(LoginLocators.TITLE).getByText("Login")).toBeVisible(),
            expect(this.page).toHaveURL(Url.BASEURL + Url.LOGIN),
        ]);        

        console.log('Login Page loaded successfully');
    }

    public async loginWithValidCredentials(): Promise<void> {
        const data = this.dataFactory.getData();

        await Promise.all([
            expect(this.page.locator(LoginLocators.USERNAME)).toBeVisible(),
            expect(this.page.locator(LoginLocators.PASSWORD)).toBeVisible(),
            expect(this.page.locator(LoginLocators.LOGIN_BUTTON)).toBeEnabled(),
        ]);        

        await this.page.fill(LoginLocators.USERNAME, data.loginData.userDetails.userName);
        await this.page.fill(LoginLocators.PASSWORD, data.loginData.userDetails.password);
        await this.page.click(LoginLocators.LOGIN_BUTTON);

        console.log(`Logging with userName: ${data.loginData.userDetails.userName} and password: ${data.loginData.userDetails.password}`);
    }

    public async verifyLoggedInSuccessfully(): Promise<void> {
        const data = this.dataFactory.getData();

        await Promise.all([
            expect(this.page.locator(HeaderLocators.WISH_LIST)).toBeEnabled(),
            expect(this.page.locator(HeaderLocators.USERNAME).getByText(data.loginData.userDetails.userName)).toBeVisible()
        ]);
        this.dataFactory.setData("loginData.isLoggedIn", true);

        console.log('User logged in successfully');
    }

    public async logout(): Promise<void> {
        const data = this.dataFactory.getData();

        if (!data.loginData.isLoggedIn) {
            console.log('User is not logged in skipping logout');
            return;
        }

        await Promise.all([
            expect(this.page.locator(HeaderLocators.WISH_LIST)).toBeEnabled(),
            expect(this.page.locator(HeaderLocators.USERNAME).getByText(data.loginData.userDetails.userName)).toBeVisible(),
        ]);

        await this.page.locator(HeaderLocators.USERNAME).getByText(data.loginData.userDetails.userName).click();
        await expect(this.page.getByRole('menuitem', { name: 'Logout' })).toBeVisible();
        await this.page.getByRole('menuitem', { name: 'Logout' }).click();
        this.dataFactory.setData("loginData.isLoggedIn", false);

        console.log('User logged out successfully');
    }
}
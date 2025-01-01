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

    public async verifyLoginPage(isRedirect: boolean = false): Promise<void> {
        this.page = await this.playwrightConfig.getPage();

        if (!isRedirect) {
            await this.page.goto(Url.LOGIN);
        }
        await Promise.all([
            expect(this.page.locator(LoginLocators.TITLE).getByText("Login")).toBeVisible(),
            expect(this.page).toHaveURL(Url.BASEURL + Url.LOGIN),
            expect(this.page.locator(LoginLocators.USERNAME)).toBeVisible(),
            expect(this.page.locator(LoginLocators.PASSWORD)).toBeVisible(),
            expect(this.page.locator(LoginLocators.LOGIN_BUTTON)).toBeEnabled()
        ]);        

        console.log('Login Page loaded successfully');
    }

    public async loginWithValidCredentials(isRegistration: boolean = false): Promise<void> {
        const data = this.dataFactory.getData();
        const { userName, password } = isRegistration ? data.registrationData.userDetails : data.loginData.userDetails;      

        await this.page.fill(LoginLocators.USERNAME, userName);
        await this.page.fill(LoginLocators.PASSWORD, password);
        await this.page.click(LoginLocators.LOGIN_BUTTON);

        console.log(`Logging with userName: ${userName} and password: ${password}`);
    }

    public async verifyLoggedInSuccessfully(isRegistration: boolean = false): Promise<void> {
        const data = this.dataFactory.getData();
        const { userName } = isRegistration ? data.registrationData.userDetails : data.loginData.userDetails;

        await Promise.all([
            expect(this.page.locator(HeaderLocators.WISH_LIST)).toBeEnabled(),
            expect(this.page.locator(HeaderLocators.USERNAME).getByText(userName)).toBeVisible()
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

    public async loginWithInValidCredentials(): Promise<void> {
        const data = this.dataFactory.getData();

        await Promise.all([
            expect(this.page.locator(LoginLocators.USERNAME)).toBeVisible(),
            expect(this.page.locator(LoginLocators.PASSWORD)).toBeVisible(),
            expect(this.page.locator(LoginLocators.LOGIN_BUTTON)).toBeEnabled(),
        ]);        

        await this.page.fill(LoginLocators.USERNAME, data.loginData.invalidUserDetails.userName);
        await this.page.fill(LoginLocators.PASSWORD, data.loginData.invalidUserDetails.password);
        await this.page.click(LoginLocators.LOGIN_BUTTON);

        console.log(`Logging with userName: InvalidUserName and password: InvalidPassword`);
    }

    public async verifyErrorMessage(): Promise<void> {
        await Promise.all([
            expect(this.page.locator(LoginLocators.TITLE).getByText("Login")).toBeVisible(),
            expect(this.page.locator(LoginLocators.ERROR_MESSAGE).getByText("Username or Password is incorrect.")).toBeVisible(),
        ]);

        console.log('Error message displayed successfully');
    }
}
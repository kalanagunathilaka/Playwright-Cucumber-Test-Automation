import { PlaywrightConfig } from './../utils/playwrightConfig';
import { Page } from 'playwright';
import { DataFactory } from './../utils/dataFactory';
import { Url } from '../data/enum/Urls';
import { expect } from 'playwright/test';
import { LoginLocators } from '../locators/loginLocator';
import { HeaderLocators } from '../locators/headerLocator';
import { PageHelper } from './helper/pageHelper';


export class Login {
    
    private page: Page = undefined as unknown as Page;
    private playwrightConfig: PlaywrightConfig;
    private dataFactory: DataFactory;
    private pageHelper: PageHelper;

    constructor() {
        this.playwrightConfig = PlaywrightConfig.getInstance();
        this.dataFactory = DataFactory.getInstance();
        this.pageHelper = new PageHelper();
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
            //await this.pageHelper.urlNavigate(Url.LOGIN);
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
        this.page = await this.playwrightConfig.getPage();
        const data = this.dataFactory.getData();
        const { userName, password } = isRegistration ? data.registrationData.userDetails : data.loginData.userDetails;      

        await this.page.locator(LoginLocators.USERNAME).type(userName, { delay: 10 });
        await this.page.locator(LoginLocators.PASSWORD).type(password, { delay: 10 });
        await this.page.click(LoginLocators.LOGIN_BUTTON);
        await this.page.waitForTimeout(2000);

        console.log(`Logging with userName: ${userName} and password: ${password}`);
    }

    public async verifyLoggedInSuccessfully(isRegistration: boolean = false): Promise<void> {
        this.page = await this.playwrightConfig.getPage();
        const data = this.dataFactory.getData();
        const { userName } = isRegistration ? data.registrationData.userDetails : data.loginData.userDetails;

        await Promise.all([
            expect(this.page.locator(HeaderLocators.WISH_LIST)).toBeEnabled(),
            expect(this.page.locator(HeaderLocators.USERNAME).getByText(userName)).toBeVisible()
        ]);
        this.dataFactory.setData("loginData.isLoggedIn", true);

        console.log('User logged in successfully');
    }

    public async verifyNotLoggedIn():Promise<void> {
        const data = this.dataFactory.getData();
        this.page = await this.playwrightConfig.getPage();
        
            if(data.loginData.isLoggedIn){
                console.log('User is already logged in');
                console.log('Logging out user');
                await this.logout();
            }else{
                await expect(this.page.locator(HeaderLocators.LOGIN)).toBeVisible();
                console.log('User Not logged in');
            }
        
        console.log('User Not logged in');
    }

    public async logout(force: boolean = false): Promise<void> {
        this.page = await this.playwrightConfig.getPage();
        const data = this.dataFactory.getData();

        if (!data.loginData.isLoggedIn && !force) {
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
        this.page = await this.playwrightConfig.getPage();
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
        this.page = await this.playwrightConfig.getPage();
        await Promise.all([
            expect(this.page.locator(LoginLocators.TITLE).getByText("Login")).toBeVisible(),
            expect(this.page.locator(LoginLocators.ERROR_MESSAGE).getByText("Username or Password is incorrect.")).toBeVisible(),
        ]);

        console.log('Error message displayed successfully');
    }

        // Verify that the user is not logged in
        public async verifyUserIsNotLoggedIn() {
            this.page = await this.playwrightConfig.getPage();
            // await this.page.pause();
            const isLoggedIn = await this.pageHelper.verifyUserIsLoggedIn();
            if (isLoggedIn) {
                await this.logout(true);
            }
        }
    
        // Verify that the user is logged in
        public async verifyUserIsLoggedIn() {
            this.page = await this.playwrightConfig.getPage();
            const isLoggedIn = await this.pageHelper.verifyUserIsLoggedIn();
            if (!isLoggedIn) {
                await this.login();
            }
        }
}
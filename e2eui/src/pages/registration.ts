import { Page } from "playwright";
import { PlaywrightConfig } from "../utils/playwrightConfig";
import { DataFactory } from "../utils/dataFactory";
import { RegistrationLocators } from "../locators/registrationLocator";
import { expect } from "playwright/test";
import { Url } from "../data/enum/Urls";
import { PageHelper } from "./helper/pageHelper";

export class Registration {
    private page: Page = undefined as unknown as Page;
    private playwrightConfig: PlaywrightConfig;
    private dataFactory: DataFactory;
    private pageHelper: PageHelper;

    constructor() {
        this.playwrightConfig = PlaywrightConfig.getInstance();
        this.dataFactory = DataFactory.getInstance();
        this.pageHelper = new PageHelper();
    }

    public async verifyRegistrationPage(): Promise<void> {
        this.page = await this.playwrightConfig.getPage();
        await this.page.goto(Url.REGISTRATION);
        
        await Promise.all([
            expect(this.page.locator(RegistrationLocators.TITLE).getByText("User Registration")).toBeVisible(),
            expect(this.page).toHaveURL(Url.BASEURL + Url.REGISTRATION),
            expect(this.page.locator(RegistrationLocators.FIRST_NAME)).toBeVisible(),
            expect(this.page.locator(RegistrationLocators.LAST_NAME)).toBeVisible(),
            expect(this.page.locator(RegistrationLocators.USERNAME)).toBeVisible(),
            expect(this.page.locator(RegistrationLocators.PASSWORD)).toBeVisible(),
            expect(this.page.locator(RegistrationLocators.CONFIRMPASSWORD)).toBeVisible(),
            expect(this.page.locator(RegistrationLocators.REGISTER_BUTTON)).toBeEnabled()
        ]);

        console.log('Registration Page loaded successfully');
    }

    public async validRegistration(): Promise<void> {
        const data = this.dataFactory.getData();
        const firstName = data.sharedData.randomStr;
        const lastName = data.registrationData.userDetails.lastName;
        const userName = data.sharedData.randomStr;
        const password = data.registrationData.userDetails.password;

        // Fill the registration form
        await this.page.fill(RegistrationLocators.FIRST_NAME, firstName);
        await this.page.fill(RegistrationLocators.LAST_NAME, lastName);
        await this.page.fill(RegistrationLocators.USERNAME, userName);

        // Validate the username is available by waiting for the API response
        const validateUserNameRes = await this.pageHelper.waitForApiResponse(`${data.registrationData.apiEndpoints.validateUserName}/${userName}`);
        expect(validateUserNameRes).toEqual(true);

        await this.page.fill(RegistrationLocators.PASSWORD, password);
        await this.page.fill(RegistrationLocators.CONFIRMPASSWORD, password);
        await this.page.locator(RegistrationLocators.GENDER).check();

        await this.page.locator(RegistrationLocators.REGISTER_BUTTON).click();

        // Wait for the user API response to confirm the registration
        await this.pageHelper.waitForApiResponse(data.registrationData.apiEndpoints.registerUser);

        this.dataFactory.setData('registrationData.userDetails.firstName', firstName);
        this.dataFactory.setData('registrationData.userDetails.userName', userName);
    
        console.log(`Registering with... 
            \tFirst Name: ${firstName}, 
            \tLast Name: ${lastName}, 
            \tUsername: ${userName}, 
            \tPassword: ${password}`
        );
    }
    
}

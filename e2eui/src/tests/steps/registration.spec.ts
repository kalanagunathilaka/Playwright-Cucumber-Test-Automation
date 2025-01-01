import { Given, Then, When } from "@cucumber/cucumber";
import { Registration } from "../../pages/registration";
import { Login } from "../../pages/login";

const registration = new Registration();
const login = new Login();

Given('Navigate to the User Registration Page', async function () {
    console.log('\nNavigate to the User Registration Page');
    await registration.verifyRegistrationPage();
});

When('User Submit the registration form with valid data', async function () {
    console.log('\nUser Submit the registration form with valid data');
    await registration.validRegistration();
});

Then('User should redirected to the Login Page', async function () {
    console.log('\nUser should redirected to the Login Page');
    await login.verifyLoginPage(true);
});

When('User submit the login form with registered credentials', async function () {
    console.log('\nUser submit the login form with registered credentials');
    await login.loginWithValidCredentials(true);
});

Then('Registered user should be logged in successfully', async function () {
    console.log('\nRegistered user should be logged in successfully');
    await login.verifyLoggedInSuccessfully(true);
});
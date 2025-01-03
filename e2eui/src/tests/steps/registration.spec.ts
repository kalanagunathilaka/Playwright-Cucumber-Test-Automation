import { Given, Then, When } from "@cucumber/cucumber";
import { Registration } from "../../pages/registration";
import { Login } from "../../pages/login";

const registration = new Registration();


Given('Navigate to the User Registration Page', async function () {
    console.log('\nNavigate to the User Registration Page');
    await registration.verifyRegistrationPage();
});

When('User Submit the registration form with valid data', async function () {
    console.log('\nUser Submit the registration form with valid data');
    await registration.validRegistration();
});


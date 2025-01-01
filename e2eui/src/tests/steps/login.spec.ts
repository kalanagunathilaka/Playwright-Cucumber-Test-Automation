import {  Given, Then, When } from "@cucumber/cucumber";
import { Login } from "../../pages/login";

const login = new Login();

Given('Navigate to the login page', async function () {
    console.log('\nNavigate to the login page');
    await login.verifyLoginPage();
});


When('User submit the login form with valid credentials', async function () {
    console.log('\nUser submit the login form with valid credentials');
    await login.loginWithValidCredentials();
});

Then('User should be logged in successfully', async function () {
    console.log('\nUser should be logged in successfully');
    await login.verifyLoggedInSuccessfully();
});
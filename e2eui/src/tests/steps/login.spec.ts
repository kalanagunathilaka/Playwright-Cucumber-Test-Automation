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

When('User submit the login form with invalid credentials', async function () {
    console.log('\nUser submit the login form with invalid credentials');
    await login.loginWithInValidCredentials();
});

Then('User should see an error message', async function () {
    console.log('\nUser should see an error message');
    await login.verifyErrorMessage();
});

Given('User is not logged in', async function () {
    console.log('\nCheck if the user is not logged in');
    await login.verifyUserIsNotLoggedIn();
});

Given('User is logged in', async function () {
    console.log('\nCheck if the user is logged in');
    await login.verifyUserIsLoggedIn();
});

Given("an user has not logged in", async function () {
    await login.verifyNotLoggedIn();
    console.log("\nUser has not logged in");
  });

Given("an user has logged in", async function () {
    await login.login();
    console.log("\nUser has logged in");
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
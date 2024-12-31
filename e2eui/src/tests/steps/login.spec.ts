import {  Given, Then, When } from "@cucumber/cucumber";

Given('Navigate to the login page', async function () {
    console.log('Navigate to the login page');  
});

When('When User submit the login form with valid credentials', async function () {
    console.log('When User submit the login form with valid credentials');
});

Then('Then User should be logged in successfully', async function () {
    console.log('Then User should be logged in successfully');
});
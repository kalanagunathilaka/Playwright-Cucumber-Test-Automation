import {  Then, When } from "@cucumber/cucumber";
const { Given } = require('@cucumber/cucumber');

Given('I am on the login page', async function () {
    console.log('I am on the login page');
});

When('I enter valid credentials', async function () {
    console.log('I enter valid credentials');
});

When('I click on the login button', async function () {
    console.log('I click on the login button');
});

Then('I should be redirected to the home page', async function () {
    console.log('I should be redirected to the home page');
});
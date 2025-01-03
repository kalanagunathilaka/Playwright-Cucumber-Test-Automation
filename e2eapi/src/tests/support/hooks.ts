import { After, AfterAll, AfterStep, Before, BeforeAll, BeforeStep, Status } from "@cucumber/cucumber";
import { APIRequestContext, request } from "playwright";

BeforeAll(async function() {
    console.log('***********************************************************');
    console.log('Global Setup: Initializing Playwright API Request Context...');
    console.log('***********************************************************');
})

Before(async function() {
    const context: APIRequestContext = await request.newContext();
    this.context = context;
})

After(async function() {
    console.log('\n***********************************************************');
})

AfterAll(async function() {
    console.log('Global Wrapup: Closing Playwright API Request Context...');
    console.log('***********************************************************');
})
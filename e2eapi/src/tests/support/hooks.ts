import { After, AfterStep, Before, BeforeStep, Status } from "@cucumber/cucumber";
import { APIRequestContext, request } from "playwright";

Before(async function() {

    const context: APIRequestContext = await request.newContext();
    this.context = context;
    
})


Before({tags: "@admin"}, async function() {

    //this will execute before scenarios with tag @admin
})


After(async function() {
    //this will execute after all the scenarios
})

BeforeStep(async function() {
//this will execute before each step

})


AfterStep(async function({ result }) {

//this will execute after each step



})
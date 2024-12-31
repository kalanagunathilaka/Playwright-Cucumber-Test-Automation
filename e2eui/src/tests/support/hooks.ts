import { After, AfterAll, BeforeAll, setDefaultTimeout } from "@cucumber/cucumber";
import { PlaywrightConfig } from "../../utils/playwrightConfig";

setDefaultTimeout(2 * 60 * 1000);
const playwrightConfig: PlaywrightConfig = PlaywrightConfig.getInstance();

BeforeAll(async function () {
    console.log('***********************************************************');
    console.log('Global Setup: Initializing Playwright browser and context...');
    const page = await playwrightConfig.getPage();
    console.log('Page Initialized:', await page.title());
    console.log('***********************************************************');
});

AfterAll(async function () {
    await playwrightConfig.closePage();
    console.log('Global Wrapup: Closing Playwright browser and context...');
    console.log('***********************************************************');
});

After(async function ({ pickle }) {
    const page = await playwrightConfig.getPage();
    const img = await page.screenshot({ path: `./reports/screenshots/${pickle.name}.png`, type: 'png' });
    this.attach(img, 'image/png');
    console.log('\n***********************************************************');

});
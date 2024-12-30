import { expect } from '@playwright/test';
import { DataFactory } from './../../../../e2eapi/src/utils/DataFactory';
import { PlaywrightConfig } from './../../utils/PlaywrightConfig';

export class PageHelper {
    private playwrightConfig: PlaywrightConfig;
    private dataFactory: DataFactory;

    constructor() {
        this.playwrightConfig = PlaywrightConfig.getInstance();
        this.dataFactory = DataFactory.getInstance();
    }

    public async validatePageTitle(page: any, pageTitle: string) {
        const title:string = await page.title();
        expect(title).toBe(pageTitle);
        console.log(`Page title is: ${title}`);
    }
}
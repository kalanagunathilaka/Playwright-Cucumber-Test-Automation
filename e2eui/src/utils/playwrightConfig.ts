import { Browser, BrowserContext, chromium, Page } from 'playwright';
import { BaseUrl } from '../data/enum/BaseUrl';

export class PlaywrightConfig {
    private static instance: PlaywrightConfig;
    private browser: Browser | null = null;
    private context: BrowserContext | null = null;
    private page: Page | null = null;
    private baseUrl:string = BaseUrl.URL;

    // Private constructor to prevent direct instantiation
    private constructor() {}

    // Public method to get the singleton instance
    public static getInstance(): PlaywrightConfig {
        if (!PlaywrightConfig.instance) {
            PlaywrightConfig.instance = new PlaywrightConfig();
        }
        return PlaywrightConfig.instance;
    }

    public async getPage(): Promise<Page> {
        if (!this.browser) {
            this.browser = await chromium.launch({ headless: false });
        }

        if (!this.context) {
            this.context = await this.browser.newContext({
                baseURL: this.baseUrl,
            });
        }

        if (!this.page) {
            this.page = await this.context.newPage();
            await this.page.goto(this.baseUrl);
        }

        return this.page;
    }

    public async closePage(): Promise<void> {
        if (this.page) {
            await this.page.close();
            this.page = null;
        }

        if (this.context) {
            await this.context.close();
            this.context = null;
        }

        if (this.browser) {
            await this.browser.close();
            this.browser = null;
        }
    }

    public getBaseUrl(){
        return this.baseUrl;
    }
}
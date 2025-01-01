import { Browser, BrowserContext, chromium, Page } from 'playwright';
import { Url } from '../data/enum/Urls';

export class PlaywrightConfig {
    private static instance: PlaywrightConfig;
    private browser: Browser | null = null;
    private context: BrowserContext | null = null;
    private page: Page | null = null;
    private baseUrl: string = Url.BASEURL;

    // Private constructor to prevent direct instantiation
    private constructor() { }

    // Public method to get the singleton instance
    public static getInstance(): PlaywrightConfig {
        if (!PlaywrightConfig.instance) {
            PlaywrightConfig.instance = new PlaywrightConfig();
        }
        return PlaywrightConfig.instance;
    }

    public async getPage(): Promise<Page> {
        if (!this.page) {
            this.browser = await chromium.launch({ headless: false });
            this.context = await this.browser.newContext({
                baseURL: this.baseUrl,
            });
            this.page = await this.context.newPage();
            this.page.setDefaultTimeout(60 * 1000);
            await this.page.goto(this.baseUrl);
        }

        return this.page;
    }

    public async closePage(): Promise<void> {
        if (this.page) {
            await this.page.context().browser()?.close();
        }
    }

    public getBaseUrl() {
        return this.baseUrl;
    }
}
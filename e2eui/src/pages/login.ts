import { PlaywrightConfig } from './../utils/playwrightConfig';
import { Page } from 'playwright';
import { DataFactory } from './../utils/dataFactory';
import { PageHelper } from './helper/pageHelper';

export class Login {
    private page: Page = undefined as unknown as Page;
    private playwrightConfig: PlaywrightConfig;
    private pageHelper: PageHelper;
    private dataFactory: DataFactory;

    constructor(){
        this.playwrightConfig = PlaywrightConfig.getInstance();
        this.pageHelper = new PageHelper();
        this.dataFactory = DataFactory.getInstance(); 
    }

    public async verifyLoginPage(): Promise<void> {
        this.page = await this.playwrightConfig.getPage();
        // await this.pageHelper.verifyPageTitle(this.page, 'Login');
    }
}
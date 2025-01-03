import { PlaywrightConfig } from './../utils/playwrightConfig';
import { Page } from 'playwright';
import { DataFactory } from './../utils/dataFactory';
import { Url } from '../data/enum/Urls';
import { expect } from 'playwright/test';
import { HeaderLocators } from '../locators/headerLocator';
import { HomePageLocators } from '../locators/homePageLocators';
import { Book } from '../models/Book';
import { PageHelper } from "./helper/pageHelper";

export class Homepage {

    private page: Page = undefined as unknown as Page;
    private playwrightConfig: PlaywrightConfig;
    private dataFactory: DataFactory;

    constructor() {
        this.playwrightConfig = PlaywrightConfig.getInstance();
        this.dataFactory = DataFactory.getInstance();
    }

    public async verifyHomePage(isRedirect: boolean = false): Promise<void> {
        this.page = await this.playwrightConfig.getPage();

        if (!isRedirect) {
            await this.page.goto(Url.BASEURL);
        }
        await this.page.waitForSelector(HomePageLocators.BookCard)
        await Promise.all([
            expect(this.page.locator(HeaderLocators.TITLE).getByText("Book Cart")).toBeVisible(),
            expect(this.page).toHaveURL(Url.BASEURL),
        ]);

        console.log('Home Page loaded successfully');
    }

    public async changeBookCategory(): Promise<void> {
        this.page = await this.playwrightConfig.getPage();

        await Promise.all([
            expect(this.page.locator('span').filter({ hasText: 'All Categories' }).first()).toBeVisible(),
            expect(this.page).toHaveURL(Url.BASEURL),
        ]);

        console.log(' Categories Coloumn is visible  ');

        await Promise.all([
            await (this.page.locator(HomePageLocators.BookCategory).filter({ hasText: 'Mystery' })).click(),
            expect(this.page).toHaveURL(Url.BASEURL + Url.BOOKCATEGORY + "mystery"),

        ]);
        console.log('Selecting Mystery Books Category...')

    }
    public async verifyChangeBookCategory(): Promise<void> {
        this.page = await this.playwrightConfig.getPage();

        await Promise.all([
            expect(this.page.getByText("The Fault in Our Stars")).toBeVisible,
            expect(this.page.getByText("This Storm")).toBeVisible,
        ]);

        console.log('Mystery Books category was selected succesfully');
    }

    public async searchItemOnSearchBar(): Promise<void> {
        this.page = await this.playwrightConfig.getPage();
        const bookTitle = "The Chosen"

        await Promise.all([
            await (this.page.click(HomePageLocators.SearchBar)),
            await (this.page.fill(HomePageLocators.SearchBar, bookTitle)),
            await (this.page.getByRole('option', { name: 'The Chosen' }).locator('span').click()),

        ]);

        console.log('The book title was entered successfully');
    }

    public async verifySearchedItemOnSearchBar(): Promise<void> {
        this.page = await this.playwrightConfig.getPage();
        const bookTitle = "The Chosen"

        await Promise.all([
            expect(this.page.locator(HomePageLocators.BookCardTitle).getByText("₹5,555.00")).toBeVisible,
            expect(this.page).toHaveURL(Url.BASEURL + Url.SEARCHEDITEM + "the" + "%20" + "chosen"),
        ]);

        console.log('The searched book has been displayed successfully');
        await (this.page.locator(HomePageLocators.SearchBar).press('Enter'));
    }


    public async changePriceFromPriceFilter(): Promise<void> {
        this.page = await this.playwrightConfig.getPage();

        // Count the number of books displayed before filtering
        const booksPreFilter = this.page.locator(HomePageLocators.BookCard);
        const bookCountPreFilter = await booksPreFilter.count();
        console.log(`Number of books displayed before filtering : ${bookCountPreFilter}`);

        console.log("\nFilter books with price less than Rs.4000")
        await (this.page.getByRole('slider').hover());
        if (this.page.getByText('4k')) {
            await (this.page.getByRole('slider').click())
        }

    }

    public async verifyChangedPriceFromPriceFilter(): Promise<void> {
        this.page = await this.playwrightConfig.getPage();

        // Count the number of books displayed after filtering
        const booksPostFilter = this.page.locator(HomePageLocators.BookCard);
        const bookCountPostFilter = await booksPostFilter.count();
        console.log(`Number of books displayed after filtering : ${bookCountPostFilter}`);

        console.log("Checking if the filtered books are cost less than 4000");

        // Verify each book price is <= 4000
        for (let i = 0; i < bookCountPostFilter; i++) {
            const priceText = await booksPostFilter.nth(i).locator(HomePageLocators.BookCardPrice).textContent();
            const price = parseFloat(priceText?.replace(/[^0-9.]/g, '') || '0');

            expect(price).toBeLessThanOrEqual(4000);
        }
        console.log("All the filtered books are of price less than Rs.4000");

    }
}
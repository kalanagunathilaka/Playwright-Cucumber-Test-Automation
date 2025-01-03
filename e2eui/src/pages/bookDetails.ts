import { PlaywrightConfig } from "../utils/playwrightConfig";
import { Page } from "playwright";
import { Url } from "../data/enum/Urls";
import { expect } from "playwright/test";
import { HomePageLocators } from "../locators/homePageLocators";
import { ItemDetailPageLocators } from "../locators/itemDetailPageLocators";
import { Book } from "../models/Book";
import { DataFactory } from "../utils/dataFactory";
import { PageHelper } from "./helper/pageHelper";

export class BookDetails {



  private page: Page = undefined as unknown as Page;
  private playwrightConfig: PlaywrightConfig;
  private dataFactory: DataFactory;
  private pageHelper: PageHelper;

  constructor(playwrightConfig: PlaywrightConfig) {
    this.playwrightConfig = PlaywrightConfig.getInstance();
    this.dataFactory = DataFactory.getInstance();
    this.pageHelper = new PageHelper();
  }

 

  public async verifyBookDetails(selctedBooksWithIndex: Array<Book & { index: number }>): Promise<void> {
    {
      this.page = await this.playwrightConfig.getPage();
      await this.page.goto(Url.BASEURL);
      const BookCards = HomePageLocators.BookCard;
      for (const book of selctedBooksWithIndex) {
        const selectedBookCard = this.page.locator(BookCards).nth(book.index);
        await selectedBookCard.click();
        await this.page.waitForSelector(ItemDetailPageLocators.Title);
        expect(await this.page.locator(ItemDetailPageLocators.Title).textContent()).toContain(book.title);
        expect(await this.page.locator(ItemDetailPageLocators.Price).textContent()).toContain(book.price);
        console.log(`Book details verified: ${book.title}`);
        await this.page.goBack();

      }
    }
  }

  public async addBookToCartViaItemDetailPage(): Promise<Book> {
    this.page = await this.playwrightConfig.getPage();
    const data = this.dataFactory.getData();
    await this.page.goto(Url.BASEURL);

    // Verify Home Page
    await Promise.all([
        expect(this.page.locator(HomePageLocators.FilterTitle).getByText("Price Filter")).toBeVisible(),
        expect(this.page).toHaveURL(Url.BASEURL),
        expect(this.page.locator(HomePageLocators.BookCard).first()).toBeVisible(),
    ]);

    // Click on the first book's title to navigate to the Item Detail Page
    const firstBookCard = this.page.locator(HomePageLocators.BookCard).first();
    await firstBookCard.locator(HomePageLocators.BookCardTitle).click();

    // Wait for Item Detail Page to load and verify
    await this.page.waitForSelector(ItemDetailPageLocators.Title, { state: "visible" });

    
    const book: Book = {
        title: await this.page.locator(ItemDetailPageLocators.Title).textContent(),
        author: await this.page.locator(ItemDetailPageLocators.Author).textContent(),
        category: await this.page.locator(ItemDetailPageLocators.Category).textContent(),
        price: await this.page.locator(ItemDetailPageLocators.Price).textContent(),
    };

    // Click the "Add to Cart" button
    await this.page.waitForSelector(ItemDetailPageLocators.AddToCartButton, { state: "visible" });
    await this.page.locator(ItemDetailPageLocators.AddToCartButton).first().click();
   

    await this.page.waitForTimeout(1000);

    console.log(`Book added to cart from Item Detail Page: ${book.title} - ${book.price}`);
    return book;
}
  
}
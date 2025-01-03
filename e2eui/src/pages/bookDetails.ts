import { PlaywrightConfig } from "../utils/playwrightConfig";
import { Page } from "playwright";
import { Url } from "../data/enum/Urls";
import { expect } from "playwright/test";
import { HomePageLocators } from "../locators/homePageLocators";
import { ItemDetailPageLocators } from "../locators/itemDetailPageLocators";
import { Book } from "../models/Book";

export class BookDetails {
  private page!: Page;  // Add the '!' to indicate this will be initialized later
  private playwrightConfig: PlaywrightConfig;

  constructor(playwrightConfig: PlaywrightConfig) {
    this.playwrightConfig = playwrightConfig;
  }

  // Initialize page asynchronously in this method
  public async initializePage(): Promise<void> {
    this.page = await this.playwrightConfig.getPage();
  }

  public async selectAndVerifyTwoBooks(): Promise<void> {
    // Ensure the page is initialized before using it
    await this.initializePage();

    await this.page.goto(Url.BASEURL);

    // Verify the home page
    await Promise.all([
      expect(this.page.locator(HomePageLocators.BookCard)).toBeVisible(),
      expect(this.page).toHaveURL(Url.BASEURL),
    ]);

    // Get the total number of books, limit to the first 40
    const totalBooks = Math.min(
      await this.page.locator(HomePageLocators.BookCard).count(),
      40
    );

    // Select two random indices within the first 40
    const randomIndices = Array.from(
      new Set([Math.floor(Math.random() * totalBooks), Math.floor(Math.random() * totalBooks)])
    );

    for (const index of randomIndices) {
      const bookCard = this.page.locator(HomePageLocators.BookCard).nth(index);

      // Capture book details (name and price) from the home page
      const expectedBook: Partial<Book> = {
        title: await bookCard.locator(HomePageLocators.BookCardTitle).textContent(),
        price: await bookCard.locator(HomePageLocators.BookCardPrice).textContent(),
      };

      console.log(`Expected book details (Home Page): ${JSON.stringify(expectedBook)}`);

      // Click on the book card to navigate to the details page
      await bookCard.locator(HomePageLocators.BookCardTitle).click();

      // Wait for the details page to load
      await this.page.waitForSelector(ItemDetailPageLocators.Title, { state: "visible" });

      // Verify the book name and price on the details page
      const actualBook: Partial<Book> = {
        title: await this.page.locator(ItemDetailPageLocators.Title).textContent(),
        price: await this.page.locator(ItemDetailPageLocators.Price).textContent(),
      };

      expect(actualBook.title).toBe(expectedBook.title);
      expect(actualBook.price).toBe(expectedBook.price);

      console.log(`Verified book details (Details Page): ${JSON.stringify(actualBook)}`);

      // Navigate back to the home page
      await this.page.goto(Url.BASEURL);
    }
  }

  public async verifyBookDetails(expectedBook: Book): Promise<void> {
    if (!this.page) {
      throw new Error("Page not initialized");
    }

    const title = await this.page.locator(ItemDetailPageLocators.Title).textContent();
    const author = await this.page.locator(ItemDetailPageLocators.Author).textContent();
    const category = await this.page.locator(ItemDetailPageLocators.Category).textContent();
    const price = await this.page.locator(ItemDetailPageLocators.Price).textContent();

    expect(title).toBe(expectedBook.title);
    expect(author).toBe(expectedBook.author);
    expect(category).toBe(expectedBook.category);
    expect(price).toBe(expectedBook.price);

    console.log(`Verified details for book: ${expectedBook.title}`);
  }
}

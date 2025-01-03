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

  public async selectTwoBooks(): Promise<Array<Book & { index: number }>> {
    {
      this.page = await this.playwrightConfig.getPage();
      const data = this.dataFactory.getData();
      await this.page.goto(Url.BASEURL);

      const selectedBooks: Array<Book & { index: number }> = []; // Extend the Book type to include 'index'
      
      //verify Home page
      await Promise.all([
        expect(this.page.locator(HomePageLocators.FilterTitle).getByText("Price Filter")).toBeVisible(),
        expect(this.page).toHaveURL(Url.BASEURL),
        expect(this.page.locator(HomePageLocators.BookCard).first()).toBeVisible(),
      ]);
      //get book details from Book card
      const BookCards = HomePageLocators.BookCard;
      const count = await this.page.locator(BookCards).count();
      const selectedTwoRandomBooksIndexes = this.generateTwoUniqueRandomNumbers(count);
      
      console.log(`Selected book indexes: ${selectedTwoRandomBooksIndexes}`);

      for (const index of selectedTwoRandomBooksIndexes) {
        await this.page.locator(HomePageLocators.BookCardTitle).nth(index).waitFor({ state: 'visible' });
        console.log(`Selected book index: ${index}`);
        const Title = await this.page.locator(HomePageLocators.BookCardTitle).nth(index).textContent();
        const Price = await  this.page.locator(HomePageLocators.BookCardPrice).nth(index).textContent();
        console.log(`Selected book: ${Title}`);
        const book: Book & { index: number } = {
          index,
          title: Title,
          price: Price,
          author: null,
          category: null,
        };
     
        selectedBooks.push(book);
       
      }
      console.log(`Selected books: ${selectedBooks[0].title + " & " + selectedBooks[1].title}`);
      return selectedBooks;
    }
  }

  public generateTwoUniqueRandomNumbers(count: number): number[] {
    const firstNumber = Math.floor(Math.random() * count) + 1;
    let secondNumber;

    do {
      secondNumber = Math.floor(Math.random() * count) + 1;
    } while (secondNumber === firstNumber);

    return [firstNumber, secondNumber];
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
  
}
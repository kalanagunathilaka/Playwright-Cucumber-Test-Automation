import { data } from "../../../e2eapi/src/data/factoryData/data";
import { PlaywrightConfig } from "../utils/playwrightConfig";
import { Page } from "playwright";
import { DataFactory } from "../utils/dataFactory";
import { Url } from "../data/enum/Urls";
import { expect } from "playwright/test";
import { LoginLocators } from "../locators/loginLocator";
import { HeaderLocators } from "../locators/headerLocator";
import { Book } from "../models/Book";
import { HomePageLocators } from "../locators/homePageLocators";
import { CartLocators } from "../locators/cartLocators";
import { CartItem } from "../models/cartItem";

export class Cart {
  private page: Page = undefined as unknown as Page;
  private playwrightConfig: PlaywrightConfig;
  private dataFactory: DataFactory;

  constructor() {
    this.playwrightConfig = PlaywrightConfig.getInstance();
    this.dataFactory = DataFactory.getInstance();
  }

  public async addBookToCartViaHomePage(): Promise<Book> {
    this.page = await this.playwrightConfig.getPage();
    await this.page.goto(Url.BASEURL);

    //verify Home page
    await Promise.all([
      expect(
        this.page
          .locator(HomePageLocators.FilterTitle)
          .getByText("Price Filter")
      ).toBeVisible(),
      expect(this.page).toHaveURL(Url.BASEURL),
      expect(
        this.page.locator(HomePageLocators.BookCard).first()
      ).toBeVisible(),
    ]);
    //get book details from Book card
    const firstBookCardSelector = HomePageLocators.BookCard;
    const firstBookCard = this.page.locator(firstBookCardSelector).first();
    const book: Book = {
      title: await firstBookCard
        .locator(HomePageLocators.BookCardTitle)
        .textContent(),
      price: await firstBookCard
        .locator(HomePageLocators.BookCardPrice)
        .textContent(),
      author: null,
      category: null,
    };
    //wait for add to cart button
    await this.page.waitForSelector(HomePageLocators.HomePageFirstAddToCartButton,{state: "visible"});

    //click add to cart button in Book card
    await this.page.locator(HomePageLocators.HomePageFirstAddToCartButton).click();

    console.log(`Book added to cart: ${book.title} - ${book.price}`);
    return book;
  }

  public async verifyItemAddedToCart(book: Book): Promise<void> {
    this.page = await this.playwrightConfig.getPage();
    await this.page.goto(Url.CART);
    await this.page.waitForSelector(CartLocators.CartTitle, {
      state: "visible",
    });
    await this.page.waitForSelector(CartLocators.CartRow);

    let matchingRow = await this.findMatchingRow(book);
    expect(matchingRow).toBeTruthy();
    console.log(`Book added to cart & Verified: ${book.title} - ${book.price}`);
  }

  public async removeBookFromCart(books: Book): Promise<void> {
    this.page = await this.playwrightConfig.getPage();
    await this.page.goto(Url.CART);
    await this.page.waitForSelector(CartLocators.CartTitle, {
      state: "visible",
    });
    await this.page.waitForSelector(CartLocators.CartRow);

    const length = await this.page.locator(CartLocators.CartRow).count();

    let matchingRow = await this.findMatchingRow(books);
    if (matchingRow) {
      await this.page
        .locator(CartLocators.getCartItemDelete(matchingRow))
        .click();
      console.log(`Book removing from cart: ${books.title} - ${books.price}`);
    }
  }

  public async verifyItemRemovedFromCart(book: Book): Promise<void> {
    this.page = await this.playwrightConfig.getPage();
    await this.page.goto(Url.CART);
    await this.page.waitForSelector(CartLocators.CartTitle, {
      state: "visible",
    });
    if (await this.page.locator(CartLocators.CartRow).isVisible()) {
      if (!(await this.findMatchingRow(book))) {
        console.log(
          `Book removed from cart & Verified: ${book.title} - ${book.price}`
        );
      }
    } else {
      console.log("Cart is empty");
      console.log(
        `Book removed from cart & Verified: ${book.title} - ${book.price}`
      );
    }
  }

  public async increaseQuantityOfBookInCart(book: Book): Promise<CartItem> {
    this.page = await this.playwrightConfig.getPage();
    await this.page.goto(Url.CART);
    await this.page.waitForSelector(CartLocators.CartTitle, {
      state: "visible",
    });
    await this.page.waitForSelector(CartLocators.CartRow);

    let matchingRow = await this.findMatchingRow(book);
    const rowTitle = await this.page
      .locator(CartLocators.getCartItemTitle(matchingRow))
      .textContent();
    const rowQuantity = await this.page
      .locator(CartLocators.getCartItemQuantity(matchingRow))
      .textContent();
    const rowTotalPrice = await this.page
      .locator(CartLocators.getCartItemTotalPrice(matchingRow))
      .textContent();

    console.log(
      `${rowTitle} Book quantity - ${rowQuantity} & Total Price - ${rowTotalPrice}`
    );

    const cartItem: CartItem = {
      book: book,
      quantity: rowQuantity ? parseInt(rowQuantity) : 0,
      total: rowTotalPrice ? parseInt(rowTotalPrice) : 0,
    };

    await this.page
      .locator(CartLocators.getCartItemQuantityIncrease(matchingRow))
      .click();
    console.log(
      `Book quantity increased in cart: ${book.title} - ${book.price}`
    );
    return cartItem;
  }

  public async verifyBookQuantityUpdated(cartItem: any, arg1: string) {
    this.page = await this.playwrightConfig.getPage();
    await this.page.goto(Url.CART);
    await this.page.waitForSelector(CartLocators.CartTitle, {
      state: "visible",
    });
    await this.page.waitForSelector(CartLocators.CartRow);

    let matchingRow = await this.findMatchingRow(cartItem.book);
    const rowTitle = await this.page
      .locator(CartLocators.getCartItemTitle(matchingRow))
      .textContent();
    const rowQuantity = await this.page
      .locator(CartLocators.getCartItemQuantity(matchingRow))
      .textContent();
    const rowTotalPrice = await this.page
      .locator(CartLocators.getCartItemTotalPrice(matchingRow))
      .textContent();

    console.log(
      `${rowTitle} Book quantity - ${rowQuantity} & Total Price - ${rowTotalPrice}`
    );
    expect(rowQuantity ? parseInt(rowQuantity) : 0).toBe(cartItem.quantity + 1);
    console.log(
      `Book quantity updated in cart & Verified: ${cartItem.book.title} - ${cartItem.book.price}`
    );
  }

  async findMatchingRow(book: Book): Promise<number | undefined> {
    const length = await this.page.locator(CartLocators.CartRow).count();

    let matchingRow: number | undefined;
    for (let i = 1; i <= length; i++) {
      const rowTitle = await this.page
        .locator(CartLocators.getCartItemTitle(i))
        .textContent();
      const rowPrice = await this.page
        .locator(CartLocators.getCartItemPrice(i))
        .textContent();

      if (
        rowTitle?.trim() === book.title.trim() &&
        rowPrice?.trim() === book.price.trim()
      ) {
        matchingRow = i;
        break;
      }
    }
    return matchingRow;
  }

  public async clearCart(): Promise<void> {
    this.page = await this.playwrightConfig.getPage();
    await this.page.goto(Url.CART);
    await this.page.waitForSelector(CartLocators.CartTitle, {
      state: "visible",
    });
    await this.page.waitForSelector(CartLocators.CartRow);

    const length = await this.page.locator(CartLocators.CartRow).count();
    if (length > 0) {
      await this.page.click(CartLocators.ClearCartButton);
      console.log("Cart cleared");
    }
  }

  public async verifyCartCleared(): Promise<void> {
    this.page = await this.playwrightConfig.getPage();
    await this.page.goto(Url.CART);
    await this.page.waitForSelector(CartLocators.CartTitle, {
      state: "visible",
    });

    expect(this.isCartCleared()).toBeTruthy();

    console.log("Cart cleared & Verified");
  }

  public async checkoutCart(): Promise<void> {
    this.page = await this.playwrightConfig.getPage();
    await this.page.goto(Url.CART);
    await this.page.waitForSelector(CartLocators.CartTitle, {
      state: "visible",
    });
    await this.page.waitForSelector(CartLocators.CartRow);

    if (await this.page.locator(CartLocators.CartRow).isVisible()) {
      await this.page.click(CartLocators.CheckoutButton);
      console.log("Cart redirecting to Checkout");
    } else {
      console.log("Cart is empty");
    }
  }

  public async verifyCartRedirectedToCheckout() {
    this.page = await this.playwrightConfig.getPage();
    await this.page.getByText("Check Out").waitFor({ state: "visible" });
    expect(await this.page).toHaveURL(Url.BASEURL + Url.CHECKOUT);
    console.log("Cart redirected to Checkout & Verified");
  }

  public async isCartCleared() {
    if (await this.page.locator(CartLocators.getCartItemTitle(1)).isVisible()) {
      return false;
    } else if (await this.page.locator(CartLocators.emptyCart).isVisible()) {
      return true;
    }
  }
}
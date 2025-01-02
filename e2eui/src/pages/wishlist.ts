import { PlaywrightConfig } from '../utils/playwrightConfig';
import { Page } from 'playwright';
import { Url } from '../data/enum/Urls';
import { expect } from 'playwright/test';
import { HeaderLocators } from '../locators/headerLocator';
import { WishlistLocators } from '../locators/wishlistLocator';

export class Wishlist {
  private page: Page = undefined as unknown as Page;
  private playwrightConfig: PlaywrightConfig;

  constructor() {
    this.playwrightConfig = PlaywrightConfig.getInstance();
  }

  public async navigateToHomePage(): Promise<void> {
    this.page = await this.playwrightConfig.getPage();
    await this.page.goto(Url.HOME);
    console.log('Navigated to the home page');
  }

  public async verifyWishlistIconNotVisible(): Promise<void> {
    const wishlistIcon = this.page.locator(HeaderLocators.WISH_LIST);
    await expect(wishlistIcon).not.toBeVisible();
    console.log('Wishlist icon is not visible');
  }

  public async ensureUserIsLoggedIn(): Promise<void> {
    // Implement login logic here if the user is not already logged in
    const isLoggedIn = await this.page.locator(HeaderLocators.USERNAME).isVisible();
    if (!isLoggedIn) {
      console.log('User is not logged in. Logging in...');
      // Call login method from Login class
    }
  }

  public async addBookToWishlist(): Promise<void> {
    await this.page.locator(WishlistLocators.FIRST_BOOK_WISHLIST_ICON).click();
    console.log('Book added to wishlist');
  }

  public async verifyBookInWishlist(): Promise<void> {
    await this.page.goto(Url.WISHLIST);
    const bookInWishlist = this.page.locator(WishlistLocators.WISHLIST_BOOK_TITLE);
    await expect(bookInWishlist).toBeVisible();
    console.log('Book is in the wishlist');
  }

  public async ensureBookInWishlist(): Promise<void> {
    await this.verifyBookInWishlist();
  }

  public async removeBookFromWishlist(): Promise<void> {
    await this.page.locator(WishlistLocators.REMOVE_BUTTON).click();
    console.log('Book removed from wishlist');
  }

  public async verifyBookNotInWishlist(): Promise<void> {
    const bookInWishlist = this.page.locator(WishlistLocators.WISHLIST_BOOK_TITLE);
    await expect(bookInWishlist).not.toBeVisible();
    console.log('Book is no longer in the wishlist');
  }

  public async addBookToCartFromWishlist(): Promise<void> {
    await this.page.locator(WishlistLocators.ADD_TO_CART_BUTTON).click();
    console.log('Book added to cart from wishlist');
  }

  public async verifyBookInCart(): Promise<void> {
    await this.page.goto(Url.CART);
    const bookInCart = this.page.locator(WishlistLocators.CART_BOOK_TITLE);
    await expect(bookInCart).toBeVisible();
    console.log('Book is in the cart');
  }
}

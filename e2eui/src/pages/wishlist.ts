import { Cart } from './cart';
import { Page } from 'playwright';
import { PlaywrightConfig } from './../utils/playwrightConfig';
import { WishlistLocators } from '../locators/wishlistLocator';
import { expect } from 'playwright/test';
import { DataFactory } from './../utils/dataFactory';
import { HeaderLocators } from '../locators/headerLocator';
import { PageHelper } from './helper/pageHelper';
import { Login } from './login';
import { Url } from '../data/enum/Urls';
import { Book } from '../models/Book';

export class Wishlist {

    private page: Page = undefined as unknown as Page;
    private playwrightConfig: PlaywrightConfig;
    private dataFactory: DataFactory;
    private pageHelper: PageHelper;
    private login: Login;
    private cart: Cart;

    constructor() {
        this.playwrightConfig = PlaywrightConfig.getInstance();
        this.dataFactory = DataFactory.getInstance();
        this.pageHelper = new PageHelper();
        this.login = new Login();
        this.cart = new Cart();
    }

    // Verify that the user is not logged in
    public async verifyUserIsNotLoggedIn() {
        this.page = await this.playwrightConfig.getPage();
        const isLoggedIn = await this.pageHelper.verifyUserIsLoggedIn();
        if (isLoggedIn) {
            await this.login.logout(true);
        }
    }

    // Verify that the user is logged in
    public async verifyUserIsLoggedIn() {
        this.page = await this.playwrightConfig.getPage();
        const isLoggedIn = await this.pageHelper.verifyUserIsLoggedIn();
        if (!isLoggedIn) {
            await this.login.login();
        }
    }

    // Verify that the wishlist icon is not visible
    public async verifyWishlistIconNotVisible(): Promise<void> {
        this.page = await this.playwrightConfig.getPage();

        await this.pageHelper.urlNavigate(Url.BASEURL);

        const isWishListVisible = await this.page.isVisible(HeaderLocators.WISH_LIST);
        expect(isWishListVisible).toBe(false);
        console.log('Wishlist icon is not visible correctly');
    }

    // Add book to wishlist
    public async addBookToWishlist(): Promise<void> {
        this.page = await this.playwrightConfig.getPage();

        await this.pageHelper.urlNavigate(Url.BASEURL);

        let wishListCountBefore = await this.getWishlistCount();
        const classAttribute = await this.page.getAttribute(WishlistLocators.ADD_TO_WISHLIST_BUTTON, 'class');
        const isSelected = classAttribute?.includes('favourite-selected');

        if (isSelected) {
            await this.toggleWishlistItem(false); // Remove item
            await this.toggleWishlistItem(true);  // Add item back
        } else {
            await this.toggleWishlistItem(true);  // Add item
        }

        const wishListCountAfter = await this.getWishlistCount();
        const expectedCount = isSelected ? wishListCountBefore : wishListCountBefore + 1;
        expect(wishListCountAfter).toBe(expectedCount);

        this.dataFactory.setData("wishlistData.isBookAddedToWishlist", true);
        console.log('Book added to wishlist');
    }

    private async getWishlistCount(): Promise<number> {
        const wishListCountText = await this.page.locator(HeaderLocators.WISH_LIST).textContent();
        return wishListCountText ? parseInt(wishListCountText.replace(/\D/g, '')) : 0;
    }

    private async toggleWishlistItem(add: boolean): Promise<void> {
        await this.page.click(WishlistLocators.ADD_TO_WISHLIST_BUTTON, { delay: 1000 });
        const message = add ? 'Item added to your Wishlist' : 'Item removed from your Wishlist';
        //await expect(this.page.getByText(message)).toBeVisible();
    }


    // Verify that the book is added to the wishlist
    public async verifyBookAddedToWishlist(): Promise<void> {
        this.page = await this.playwrightConfig.getPage();

        await this.page.click(HeaderLocators.WISH_LIST);
        await Promise.all([
            expect(this.page.locator(WishlistLocators.ADDED_BOOK_IMAGE)).toBeVisible(),
            expect(this.page.locator(WishlistLocators.ADDED_BOOK_TITLE)).toBeVisible()
        ]);
        console.log('Verified that the book is added to the wishlist');
    }

    // Remove book from wishlist  
    public async removeBookFromWishlist(): Promise<number> {
        this.page = await this.playwrightConfig.getPage();
        await this.pageHelper.urlNavigate(Url.WISHLIST);

        await Promise.all([
            expect(this.page.locator(WishlistLocators.ADDED_BOOK_IMAGE)).toBeVisible(),
            expect(this.page.locator(WishlistLocators.ADDED_BOOK_TITLE)).toBeVisible(),
            expect(this.page.locator(WishlistLocators.ADDED_BOOK_ROW).locator(WishlistLocators.REMOVE_FROM_WISHLIST_BUTTON)).toBeVisible(),
            expect(this.page.locator(WishlistLocators.ADDED_BOOK_ROW).locator(WishlistLocators.ADD_TO_CART_FROM_WISHLIST_BUTTON)).toBeVisible()
        ]);

        const wishListCountBefore = await this.getWishlistCount();
        await this.page.locator(WishlistLocators.ADDED_BOOK_ROW).locator(WishlistLocators.REMOVE_FROM_WISHLIST_BUTTON).click();
        this.dataFactory.setData("wishlistData.isBookRemovedFromWishlist", true);
        await this.page.waitForTimeout(3000);

        console.log('Book removed from wishlist');
        return wishListCountBefore;
    }

    // Verify that the book is removed from the wishlist
    public async verifyBookRemovedFromWishlist(wishListCountBefore: number): Promise<void> {
        this.page = await this.playwrightConfig.getPage();

        const wishListCountAfter = await this.getWishlistCount();
        expect(wishListCountAfter).toBe(wishListCountBefore - 1);

        await Promise.all([
            expect(this.page.locator(WishlistLocators.ADDED_BOOK_IMAGE)).not.toBeVisible(),
            expect(this.page.locator(WishlistLocators.ADDED_BOOK_TITLE)).not.toBeVisible(),
            expect(this.page.locator(WishlistLocators.ADDED_BOOK_ROW).locator(WishlistLocators.REMOVE_FROM_WISHLIST_BUTTON)).not.toBeVisible(),
            expect(this.page.locator(WishlistLocators.ADDED_BOOK_ROW).locator(WishlistLocators.ADD_TO_CART_FROM_WISHLIST_BUTTON)).not.toBeVisible()
        ]);

        console.log('Verified that the book is removed from the wishlist');
    }

    // Clear wishlist
    public async clearWishlist(): Promise<void> {
        this.page = await this.playwrightConfig.getPage();
        await this.pageHelper.urlNavigate(Url.WISHLIST);

        const clearWishlistButtonIsVisible = await this.page.isVisible(WishlistLocators.CLEAR_WISHLIST_BUTTON);

        if (!clearWishlistButtonIsVisible) {
            console.log('Wishlist is already empty');
            console.log('Book adding to wishlist...');
            await this.addBookToWishlist();
            await this.verifyBookAddedToWishlist();
        }
        await expect(this.page.locator(WishlistLocators.CLEAR_WISHLIST_BUTTON)).toBeVisible();
        await this.page.locator(WishlistLocators.CLEAR_WISHLIST_BUTTON).click();
        
        console.log('Wishlist cleared');
    }

    // Verify that the wishlist is empty
    public async verifyWishlistIsEmpty(): Promise<void> {
        this.page = await this.playwrightConfig.getPage();
        await this.pageHelper.urlNavigate(Url.WISHLIST);

        await Promise.all([
            expect(this.page.getByText('Your wishlist is empty.')).toBeVisible(),
            expect(this.page.locator(WishlistLocators.CLEAR_WISHLIST_BUTTON)).not.toBeVisible(),
            //expect(this.page.getByText('Wishlist cleared')).toBeVisible()
        ]);
        await this.page.waitForTimeout(3000);

        console.log('Verified that the wishlist is empty');
    }

    // Add book to cart from wishlist
    public async addBookToCartFromWishlist(): Promise<void> {
        this.page = await this.playwrightConfig.getPage();

        await this.pageHelper.urlNavigate(Url.WISHLIST);
        await Promise.all([
            expect(this.page.locator(WishlistLocators.ADDED_BOOK_IMAGE)).toBeVisible(),
            expect(this.page.locator(WishlistLocators.ADDED_BOOK_TITLE)).toBeVisible(),
            expect(this.page.locator(WishlistLocators.ADDED_BOOK_ROW).locator(WishlistLocators.REMOVE_FROM_WISHLIST_BUTTON)).toBeVisible(),
            expect(this.page.locator(WishlistLocators.ADDED_BOOK_ROW).locator(WishlistLocators.ADD_TO_CART_FROM_WISHLIST_BUTTON)).toBeVisible()
        ]);

        await this.page.locator(WishlistLocators.ADDED_BOOK_ROW).locator(WishlistLocators.ADD_TO_CART_FROM_WISHLIST_BUTTON).click();
        //await expect(this.page.getByText('One Item added to cart')).toBeVisible();
        console.log('Book added to cart from wishlist');
    }

    // Verify that the book is added to the cart
    public async verifyBookAddedToCart(): Promise<void> {
        this.page = await this.playwrightConfig.getPage();

        const book: Book = this.dataFactory.getData().wishlistData.bookDetails;
        await this.cart.verifyItemAddedToCart(book);
        console.log('Verified that the book is added to the cart');
    }
}

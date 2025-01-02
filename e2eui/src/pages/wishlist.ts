import { Page } from 'playwright';
import { PlaywrightConfig } from './../utils/playwrightConfig';
import { WishlistLocators } from '../locators/wishlistLocator';
import { expect } from 'playwright/test';
import { DataFactory } from './../utils/dataFactory';
import { HeaderLocators } from '../locators/headerLocator';

export class Wishlist {

    private page: Page = undefined as unknown as Page;
    private playwrightConfig: PlaywrightConfig;
    private dataFactory: DataFactory;

    constructor() {
        this.playwrightConfig = PlaywrightConfig.getInstance();
        this.dataFactory = DataFactory.getInstance();
    }

    // 

    // Check if the wishlist icon is visible after registration
    public async verifyWishlistIconNotVisible(): Promise<void> {
        this.page = await this.playwrightConfig.getPage();
        await expect(this.page.locator(WishlistLocators.WISHLIST_ICON)).toBeVisible({ timeout: 10000 });
        console.log('Wishlist icon is visible after registration');
    }

    // Add book to wishlist
    public async addBookToWishlist(): Promise<void> {
        this.page = await this.playwrightConfig.getPage();
        await this.page.click(WishlistLocators.ADD_TO_WISHLIST_BUTTON);
        this.dataFactory.setData("wishlistData.isBookAddedToWishlist", true);
        console.log('Book added to wishlist');
    }

    // Verify that the book is added to the wishlist
    public async verifyBookAddedToWishlist(): Promise<void> {
        this.page = await this.playwrightConfig.getPage();
        await this.page.click(HeaderLocators.WISH_LIST);
        await expect(this.page.locator(WishlistLocators.WISHLIST_ICON)).toBeVisible();
        console.log('Wishlist icon is visible after adding book to wishlist');
    }

    // Remove book from wishlist  
    public async removeBookFromWishlist(): Promise<void> {
        this.page = await this.playwrightConfig.getPage();
        await this.page.click(WishlistLocators.REMOVE_FROM_WISHLIST_BUTTON);
        this.dataFactory.setData("wishlistData.isBookRemovedFromWishlist", true);
        console.log('Book removed from wishlist');
    }

    // Verify that the book is removed from the wishlist
    public async verifyBookRemovedFromWishlist(): Promise<void> {
        this.page = await this.playwrightConfig.getPage();
        
        await expect(this.page.locator(WishlistLocators.WISHLIST_ICON)).not.toBeVisible({timeout:10000});
        console.log('Wishlist icon is not visible after removing book from wishlist');
    }

    // Add book to cart from wishlist
    public async addBookToCartFromWishlist(): Promise<void> {
        this.page = await this.playwrightConfig.getPage();
        await this.page.click(WishlistLocators.ADD_TO_CART_FROM_WISHLIST_BUTTON);
        console.log('Book added to cart from wishlist');
    }

    // Verify that the book is added to the cart
    public async verifyBookAddedToCart(): Promise<void> {
        this.page = await this.playwrightConfig.getPage();
        await expect(this.page.locator(WishlistLocators.ADD_TO_CART_FROM_WISHLIST_BUTTON)).toBeVisible();
        console.log('Book added to cart from wishlist');
    }
    

    
}

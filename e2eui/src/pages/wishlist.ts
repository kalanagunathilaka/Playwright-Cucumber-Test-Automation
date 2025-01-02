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

    // Check if the wishlist icon is visible before registration
    public async verifyWishlistIconNotVisible(): Promise<void> {
        this.page = await this.playwrightConfig.getPage();
        await expect(this.page.locator(WishlistLocators.WISHLIST_ICON)).toBeHidden();
        console.log('Wishlist icon is not visible before registration');
    }

    // After registration, add book to wishlist, remove from wishlist, and add to cart
    public async manageWishlist(): Promise<void> {
        this.page = await this.playwrightConfig.getPage();
        
        // Add book to wishlist
        await this.page.click(WishlistLocators.ADD_TO_WISHLIST_BUTTON);
        this.dataFactory.setData("wishlistData.isBookAddedToWishlist", true);
        console.log('Book added to wishlist');

        // Verify that the book is added to the wishlist
        await expect(this.page.locator(WishlistLocators.WISHLIST_ICON)).toBeVisible();
        console.log('Wishlist icon is visible after adding book to wishlist');

        // Remove book from wishlist
        await this.page.click(WishlistLocators.REMOVE_FROM_WISHLIST_BUTTON);
        this.dataFactory.setData("wishlistData.isBookAddedToWishlist", false);
        console.log('Book removed from wishlist');

        // Add book to cart from wishlist
        await this.page.click(WishlistLocators.ADD_TO_CART_FROM_WISHLIST_BUTTON);
        console.log('Book added to cart from wishlist');
    }
}

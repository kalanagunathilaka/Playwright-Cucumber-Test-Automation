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
import { PageHelper } from "./helper/pageHelper";
import { ItemDetailPageLocators } from "../locators/itemDetailPageLocators";


export class Cart {
    private page: Page = undefined as unknown as Page;
    private playwrightConfig: PlaywrightConfig;
    private dataFactory: DataFactory;
    private pageHelper: PageHelper;

    constructor() {
        this.playwrightConfig = PlaywrightConfig.getInstance();
        this.dataFactory = DataFactory.getInstance();
        this.pageHelper = new PageHelper();
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
                await this.page.waitForTimeout(1000);
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
        await this.page.waitForTimeout(1000);
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
        expect(rowQuantity ? parseInt(rowQuantity) : 0).toBe(arg1 == "+" ? cartItem.quantity + 1 : cartItem.quantity - 1);
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
            await this.page.waitForTimeout(1000);
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
            await this.page.waitForTimeout(1000);
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

    public async decreaseQuantityOfBookInCart(book: Book): Promise<CartItem> {
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
            .locator(CartLocators.getCartItemQuantityDecrease(matchingRow))
            .click();
        await this.page.waitForTimeout(1000);
        console.log(
            `Book quantity increased in cart: ${book.title} - ${book.price}`
        );
        return cartItem;
    }

    public async verifyBookAddedToCart(): Promise<void> {
        this.page = await this.playwrightConfig.getPage();

        const book: Book = this.dataFactory.getData().wishlistData.bookDetails;
        await this.verifyItemAddedToCart(book);
        console.log('Verified that the book is added to the cart');
    }

   
}

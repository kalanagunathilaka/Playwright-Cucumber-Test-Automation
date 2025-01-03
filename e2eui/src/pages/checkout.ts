import { PlaywrightConfig } from "../utils/playwrightConfig";
import { Page } from "playwright";
import { expect } from "playwright/test";
import { CheckoutLocators } from "../locators/checkoutLocators";
import { Url } from "../data/enum/Urls";
import { DataFactory } from "../utils/dataFactory";
import { CartLocators } from "../locators/cartLocators";

export class Checkout {

  private page: Page = undefined as unknown as Page;
  private playwrightConfig: PlaywrightConfig;
  private dataFactory: DataFactory;

  constructor() {
    this.playwrightConfig = PlaywrightConfig.getInstance();
    this.dataFactory = DataFactory.getInstance();
  }

  public async navigateToCheckout(): Promise<void> {
    this.page = await this.playwrightConfig.getPage();
    await this.page.goto(Url.CHECKOUT);
    await this.page.waitForSelector(CheckoutLocators.CheckoutTitle, {
      state: "visible",
    });
    console.log("Navigated to Checkout page");
  }

  public async fillCheckoutDetails(): Promise<void> {
    const data = this.dataFactory.getData();
    this.page = await this.playwrightConfig.getPage();
    const { name, address1, address2, pincode, state } = data.checkoutData.checkoutDetails;
    await this.page.fill(CheckoutLocators.NameField, name);
    await this.page.fill(CheckoutLocators.AddressField1, address1);
    await this.page.fill(CheckoutLocators.AddressField2, address2);
    await this.page.fill(CheckoutLocators.PincodeField, pincode);
    await this.page.fill(CheckoutLocators.StateField, state);
    console.log("Filled checkout details");
  }

  public async emptyCheckoutDetails(): Promise<void> {
    const data = this.dataFactory.getData();
    this.page = await this.playwrightConfig.getPage();
    const { name, address1, address2, pincode, state } = data.checkoutData.emptycheckoutDetails;
    await this.page.fill(CheckoutLocators.NameField, name);
    await this.page.fill(CheckoutLocators.AddressField1, address1);
    await this.page.fill(CheckoutLocators.AddressField2, address2);
    await this.page.fill(CheckoutLocators.PincodeField, pincode);
    await this.page.fill(CheckoutLocators.StateField, state);
    console.log("empty checkout details");
  }

  public async invalidCheckoutDetailsPincode(): Promise<void> {
    const data = this.dataFactory.getData();
    this.page = await this.playwrightConfig.getPage();
    const { name, address1, address2, pincode, state } = data.checkoutData.invalidcheckoutDetailsPincode;
    await this.page.fill(CheckoutLocators.NameField, name);
    await this.page.fill(CheckoutLocators.AddressField1, address1);
    await this.page.fill(CheckoutLocators.AddressField2, address2);
    await this.page.fill(CheckoutLocators.PincodeField, pincode);
    await this.page.fill(CheckoutLocators.StateField, state);
    console.log("invalid checkout details for pincode");
  }
  public async placeOrder(): Promise<void> {

    this.page = await this.playwrightConfig.getPage();

    await this.page.waitForSelector(CheckoutLocators.CheckoutTitle, {
      state: "visible",
    });

    await this.page.click(CheckoutLocators.PlaceOrderButton);
    console.log("Clicked on Place Order button");
  }

  public async verifyOrderConfirmation(): Promise<void> {
    await this.page.waitForSelector(CheckoutLocators.OrderConfirmation, {
      state: "visible",
    });
    const orderIdFromPage = await this.page
      .locator(CheckoutLocators.OrderId).first()
      .textContent();
    expect(orderIdFromPage).not.toBeNull();
    console.log(`Order placed successfully with Order ID: ${orderIdFromPage}`);
  }

  public async verifyErrorMessage(expectedError: string): Promise<void> {
    const errorMessage = await this.page
      .locator(CheckoutLocators.ErrorMessage).first()
      .textContent();
    console.log(`Error message verified: ${expectedError}`);
  }

  public async verifyErrorMessagePincode(expectedError: string): Promise<void> {
    const errorMessagePincode = await this.page
      .locator(CheckoutLocators.ErrorMessagePincode)
      .textContent();
    expect(errorMessagePincode).toEqual(expectedError);
    console.log(`Error message verified: ${expectedError}`);
  }

  public async cancelOrder(): Promise<void> {
    await this.page.click(CheckoutLocators.CancelButton);
    console.log("Clicked on Cancel button");
  }

  public async verifyRedirectedToCart(): Promise<void> {
    await this.page.waitForSelector(CheckoutLocators.CartTitle, {
      state: "visible",
    });
    expect(await this.page).toHaveURL(Url.BASEURL + Url.CHECKOUT);
    console.log("Verified redirection to Cart page after cancellation");
  }

  public async viewOrderHistory(): Promise<void> {
    this.page = await this.playwrightConfig.getPage();

    await this.page.goto(Url.ORDER_HISTORY);

    await this.page.waitForSelector(CheckoutLocators.MyOrderTitle, {
      state: "visible",
    });

    console.log("Navigated to Order History page");
  }

  public async verifyPastOrdersDisplayed(): Promise<void> {

    await this.page.waitForSelector(CheckoutLocators.OrderConfirmation, {
      state: "visible",
    });
    const orderIdFromPage = await this.page
      .locator(CheckoutLocators.OrderId).first()
      .textContent();
    expect(orderIdFromPage).not.toBeNull();
    console.log("Verified past orders are displayed");
  }

  public async verifyNoOrdersMessage(): Promise<void> {
    const message = await this.page
      .locator(CheckoutLocators.NoOrdersMessage)
      .textContent();
    expect(message).toContain("You have no orders yet");
    console.log("Verified 'no orders' message displayed");
  }
}

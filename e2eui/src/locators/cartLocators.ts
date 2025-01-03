export class CartLocators {
  
    // static readonly TITLE = '.mat-mdc-card-title.mat-h1';
    // static readonly USERNAME = 'input[formcontrolname="username"]';
    // static readonly PASSWORD = 'input[formcontrolname="password"]';
    // static readonly LOGIN_BUTTON = 'xpath=//button[span[text()="Login"]]';
    static readonly CartTitle= 'text=Shopping cart';
    static readonly CartRow= '.mat-mdc-row:nth-child(1)';
    static readonly ClearCartButton='.mat-elevation-z4 > .mdc-button__label';
    static readonly emptyCart= '.ng-star-inserted > .mat-mdc-card-header .mat-mdc-card-title';
    static readonly CheckoutButton = '.my-2 > .mdc-button__label';

    static getCartItemTitle(i: number|undefined): string {
        return `.mat-mdc-row:nth-child(${i}) a`;
    }
    static getCartItemPrice(i:number|undefined): string {
        return `.mat-mdc-row:nth-child(${i}) > .cdk-column-price`;
    }
    static getCartItemDelete(i: number|undefined): string {
        return `//tbody/tr[${i}]/td[6]/button[1]/span[3]`;
    }

    static getCartItemQuantity(i: number|undefined): string {
        return `//tbody/tr[${i}]/td[4]/div/div[2]`;
    }

    static getCartItemTotalPrice(i: number|undefined): string {
        return `//tbody/tr[${i}]/td[5]`;
    }

    static getCartItemQuantityIncrease(i: number|undefined): string {
        return `//tbody/tr[${i}]/td[4]/div/div[3]/button/span[3]`;
    }

    static getCartItemQuantityDecrease(i: number | undefined): string {
        return `//tbody/tr[${i}]/td[4]/div/div[1]/button/span[1]`;
    }
    
}
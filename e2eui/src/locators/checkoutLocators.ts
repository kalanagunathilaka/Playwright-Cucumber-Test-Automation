export class CheckoutLocators {
  
    static readonly CheckoutTitle = '.mat-h1';
    static readonly NameField = '.mat-mdc-form-field-infix input[formcontrolname="name"]';
    static readonly AddressField1 ='.mat-mdc-form-field-infix input[formcontrolname="addressLine1"]';
    static readonly AddressField2 = '.mat-mdc-form-field-infix input[formcontrolname="addressLine2"]';
    static readonly PincodeField = '.mat-mdc-form-field-infix input[formcontrolname="pincode"]';
    static readonly StateField = '.mat-mdc-form-field-infix input[formcontrolname="state"]';
    static readonly PlaceOrderButton = 'button.mat-primary.mat-mdc-raised-button';
    static readonly CancelButton = 'button.mat-warn.mat-mdc-raised-button';
    static readonly OrderConfirmation = '.mat-mdc-card-header .mat-mdc-card-header-text mat-card-title';
    static readonly OrderId = 'td.mat-mdc-cell.mat-column-orderId';
    static readonly ErrorMessage = 'mat-error';
    static readonly ErrorMessagePincode = 'mat-error:has-text("Pincode must have 6 digits only and cannot start with 0")';
    static readonly CartTitle = 'mat-card-title:has-text("Shopping cart")';
    static readonly PastOrdersDataBoxes = 'tbody[role="rowgroup"] tr';
    static readonly NoOrdersMessage = '.no-orders-message';
    static readonly MyOrderTitle = '.mat-mdc-card-title';

    static getOrderConfirmationText(i: number | undefined): string {
        return `.order-confirmation:nth-child(${i}) .order-id`;
    }

    static getErrorMessage(i: number | undefined): string {
        return `.error-message:nth-child(${i})`;
    }

    static getPastOrder(i: number | undefined): string {
        return `.past-orders:nth-child(${i}) .order-id`;
    }

    static getNoOrdersMessage(): string {
        return '.no-orders-message';
    }

    static getPlaceOrderButton(): string {
        return 'button[type="submit"]';
    }
}


import { Locator, Page, expect } from "@playwright/test";

export class OrderPage {

    readonly page: Page;
    readonly sauceLabsProduct: Locator
    readonly checkOutButton: Locator;
    readonly itemPrice: Locator;
    readonly itemName: Locator;
    readonly checkOutInfo: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly zipCode: Locator;
    readonly continueButton: Locator
    readonly finishButton: Locator;
    readonly orderMessage: Locator;
    readonly backToHomeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sauceLabsProduct = page.locator('#remove-sauce-labs-backpack');
        this.checkOutButton = page.locator("#checkout");
        this.itemPrice = page.locator(".inventory_item_price");
        this.itemName = page.locator(".inventory_item_name");
        this.checkOutInfo = page.getByText('Checkout: Your Information');
        this.firstName = page.getByPlaceholder('First Name');
        this.lastName = page.getByPlaceholder('Last Name');
        this.zipCode = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.locator("#continue")
        this.finishButton = page.locator("#finish");
        this.orderMessage = page.locator(".complete-header");
        this.backToHomeButton = page.locator('#back-to-products')
    }



    async verifyTheProduct() {
        const itemVisisbility = await this.itemName.isVisible();
        if (itemVisisbility) {
            console.log("Item added to the cart")
        }
        else {
            console.log("Item not added to the cart")
        }

    }

    async verifyItemPrice(price: string) {
        const itemCost = await this.itemPrice.textContent();
        console.log(itemCost)
        await expect(this.itemPrice).toHaveText(price);
    }

    async checkoutTheProduct(firstName: string, lastName: string, postalCode: string) {
        await this.checkOutButton.click();
        await expect(this.checkOutInfo).toBeVisible();
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.zipCode.fill(postalCode);
        await this.continueButton.click();
        await this.finishButton.click();
        await expect(this.orderMessage).toHaveText('Thank you for your order!');
        console.log(await this.orderMessage.textContent());
        await this.backToHomeButton.click();
    }
}
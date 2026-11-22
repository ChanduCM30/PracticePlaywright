
import { Locator, Page,expect } from "@playwright/test";

export class CartPage {

    readonly page: Page;
    readonly sauceLabsProduct: Locator
    readonly addToCartButton: Locator;
    readonly shoppingCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sauceLabsProduct = page.locator('#item_4_title_link div');
        this.addToCartButton = page.locator("#add-to-cart");
        this.shoppingCartButton = page.locator("a[data-test='shopping-cart-link']")
    }



    async addProductToCart(){
        await this.sauceLabsProduct.click();
        await this.addToCartButton.click();
        await this.shoppingCartButton.click();
    }
}
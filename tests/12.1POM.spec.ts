import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { CartPage } from "../pages/cartPage";
import { OrderPage } from "../pages/orderPage";

test("Login to the sauceDemo Application", async ({ page }) => {
    const login = new LoginPage(page);
    // login.loginToApplication("https://www.saucedemo.com/","standard_user","secret_sauce");

    await login.urlAction("https://www.saucedemo.com/");

    await login.fillUserName("standard_user");

    await login.fillPassword("secret_sauce");

    await login.clickLoginButton();

    await page.waitForTimeout(2000)

    expect(await page.title()).toBe('Swag Labs');

})

test("Order the product", async ({ page }) => {
    const login = new LoginPage(page);
    const cart = new CartPage(page);
    const order = new OrderPage(page);

    // await login.loginToApplication("https://www.saucedemo.com/", "standard_user", "secret_sauce");
    await login.urlAction("https://www.saucedemo.com/");

    await login.fillUserName("standard_user");

    await login.fillPassword("secret_sauce");

    await login.clickLoginButton();

    expect(await page.title()).toBe('Swag Labs');

    await cart.addProductToCart();

    await order.verifyTheProduct();

    await order.verifyItemPrice('$29.99');

    await order.checkoutTheProduct('chandu', 'cm', '343422')

})
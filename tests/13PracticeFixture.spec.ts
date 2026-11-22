import { test, expect } from "../fixtures/myCustomFixture";


test("Login to the sauceDemo Application", async ({ page, loginPage,workerFixture }) => {

    await loginPage.urlAction("https://www.saucedemo.com/");

    await loginPage.fillUserName("standard_user");

    await loginPage.fillPassword("secret_sauce");

    await loginPage.clickLoginButton();

    await page.waitForTimeout(2000)

    expect(await page.title()).toBe('Swag Labs');

    console.log(workerFixture)

})

test("Order the product", async ({ page, loginPage, cartPage, orderPage }) => {

    // await login.loginToApplication("https://www.saucedemo.com/", "standard_user", "secret_sauce");
    await loginPage.urlAction("https://www.saucedemo.com/");

    await loginPage.fillUserName("standard_user");

    await loginPage.fillPassword("secret_sauce");

    await loginPage.clickLoginButton();

    expect(await page.title()).toBe('Swag Labs');

    await cartPage.addProductToCart();

    await orderPage.verifyTheProduct();

    await orderPage.verifyItemPrice('$29.99');

    await orderPage.checkoutTheProduct('chandu', 'cm', '343422')

})

test.skip("Worker fixture", async({workerFixture})=>{
    console.log(workerFixture)
})
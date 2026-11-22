import { test, expect } from "@playwright/test";

test.beforeEach("Title verification", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");

    await page.waitForLoadState("domcontentloaded");

    await expect(page).toHaveTitle(/Swag Labs/);

    await page.screenshot({ path: "screenshot.png" });

    await page.waitForTimeout(1000);

    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();

    await page.waitForLoadState("domcontentloaded");

    await expect(page).toHaveTitle(/Swag Labs/);

    await page.screenshot({ path: "screenshot.png" });

    await expect(page.url()).toBe("https://www.saucedemo.com/inventory.html");

    await page.waitForTimeout(1000);
});


test("Adding item to the cart", async ({ page }) => {

    await page.getByText("Sauce Labs Backpack").click();

    await page.waitForLoadState("domcontentloaded");

    await page.locator("#add-to-cart").click();

    await expect(page.locator(".shopping_cart_badge")).toHaveText("1")

    await page.locator(".shopping_cart_link").click();

    await page.waitForTimeout(2000);

    await expect(page.getByText('Sauce Labs BackPack')).toHaveText("Sauce Labs Backpack");

    await expect(page.locator(".inventory_item_price")).toHaveText("$29.99");
    await page.waitForTimeout(1000);

    await page.locator("#remove-sauce-labs-backpack").click();

    await expect(page.getByText('Sauce Labs BackPack')).not.toBeVisible();
});

test("Unsuccessfull Login Scenario", async ({ page }) => {

    await page.locator(".shopping_cart_link").click();
    await expect(page.getByText('Sauce Labs BackPack')).not.toBeVisible();
});
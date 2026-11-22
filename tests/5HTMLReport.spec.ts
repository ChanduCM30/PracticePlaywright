import { test, expect } from "@playwright/test";

test("Title verification", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.waitForLoadState("domcontentloaded");

    await expect(page).toHaveTitle(/Swag Labs/);

    await page.screenshot({ path: "screenshot.png" });

    await page.waitForTimeout(2000);
});


test("Successfull Login Scenario", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");

    await page.waitForLoadState("domcontentloaded");

    await expect(page).toHaveTitle(/Swag Labs/);

    await page.screenshot({ path: "screenshot.png" });

    await page.waitForTimeout(2000);

    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();

    await page.waitForLoadState("domcontentloaded");

    await expect(page).toHaveTitle(/Swag Labs/);

    await page.screenshot({ path: "screenshot.png" });

    await expect(page.url()).toBe("https://www.saucedemo.com/inventory.html");

    await page.waitForTimeout(2000);
});

test("Unsuccessfull Login Scenario", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");

    await page.waitForLoadState("domcontentloaded");

    await expect(page).toHaveTitle(/Swag Labs/);

    await page.screenshot({ path: "screenshot.png" });

    await page.waitForTimeout(2000);

    await page.getByPlaceholder("Username").fill("standard_user");

    await page.getByPlaceholder("Password").fill("secret_sauce1");

    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.locator("h3[role='alert']")).toHaveText("Epic sadface: Username and password do not match any user in this service");

});
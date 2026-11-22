import { test, expect } from "@playwright/test";
import process from "node:process";


test("Multiple Env Demo", async ({ page }) => {
    await page.goto(<string>process.env.URL);
    await page.getByPlaceholder("Username").fill(<string>process.env.USERNAME1);
    await page.getByPlaceholder("Password").fill(<string>process.env.PASSWORD);
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator("#item_4_title_link div")).toHaveText("Sauce Labs Backpack");
    await page.close();
})
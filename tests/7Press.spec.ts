import {test,expect} from "@playwright/test";

test("start playwright with typescript", async ({ page }) => {

    await page.goto('https://www.google.com');

    await page.locator("textarea[name='q']").fill("playwright");

    await page.locator("textarea[name='q']").press("ArrowDown");
    await page.locator("textarea[name='q']").press("ArrowDown");
    await page.locator("textarea[name='q']").press("ArrowDown");

    await page.locator("textarea[name='q']").press("Enter");

    await page.waitForTimeout(500)
})
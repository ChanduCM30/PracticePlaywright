import { test, expect } from "@playwright/test";


test("Handle new page", async ({ context }) => {

    const page = await context.newPage();

    await page.goto("https://testpages.eviltester.com/pages/navigation/windows-names/");

    const newPagePromise = context.waitForEvent('page');

    await page.locator("#gobasicajax").click();

    const newPage = await newPagePromise;

    await expect(newPage).toHaveURL('https://testpages.eviltester.com/pages/navigation/windows-names/window-with-name/')

    console.log(await newPage.title());

    await expect(newPage.locator(".td-content > h1")).toHaveText("Linked Page with Window Name");

    await newPage.waitForTimeout(1000);

    await page.bringToFront();

    await newPage.waitForTimeout(1000);

    await newPage.bringToFront();

    await newPage.waitForTimeout(1000);

    await newPage.close();

})

test("Handling new window", async ({ page }) => {
    await page.goto("https://demoqa.com/browser-windows")

    await page.waitForTimeout(2000);
    const newWindowPromise= page.waitForEvent('popup');
    await page.locator("#messageWindowButton").click();

    const window=await newWindowPromise;

    await window.waitForLoadState('domcontentloaded');

    console.log(await window.locator("body").textContent());

    await window.waitForTimeout(2000);

    await window.close();

    await page.waitForTimeout(2000);


})
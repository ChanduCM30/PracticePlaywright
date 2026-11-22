import { test, expect } from "@playwright/test";

test("Keyboard Actions", async ({ page }) => {

    await page.goto("https://testpages.eviltester.com/pages/forms/html-form/");

    const commentBox = page.locator("textarea[name='comments']");
    await commentBox.scrollIntoViewIfNeeded()
    await expect(commentBox).toBeVisible();

    await commentBox.press("Control+A");

    await commentBox.press("Delete");
    await page.waitForTimeout(2000);
    await commentBox.pressSequentially("ABC", { delay: 100 });

    await commentBox.press("Control+A+X");
    await page.waitForTimeout(2000);
    const userName = page.locator("input[name='username']");

    await userName.hover();

    await userName.press("Control+V");

    await page.waitForTimeout(2000);

    await userName.press("Home");
    await page.waitForTimeout(2000);
    await userName.press("z");
    await page.waitForTimeout(2000);
    await page.keyboard.press("PageDown");
    await page.waitForTimeout(2000);
    await page.keyboard.press("PageUp");
    await page.waitForTimeout(2000);
    await page.close()



})
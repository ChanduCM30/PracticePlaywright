import { test, expect } from "@playwright/test";

/*
Locator method with options test

Syntax:
page.locator(selector, options)

Different types of options:

1. has Locator: This option allows you to specify a locator that must be present within the element matched by the selector. 
Keep the element only if it contains a specific child element.

const row = page.locator('tr').filter({
has: page.locator('a', { hasText: 'Finn Allen' })

2. hasNot

The opposite of has. Keep the element only if it does not contain a specific child element.

const rows = page.locator('tr').filter({
  hasNot: page.locator('.disabled')
});

Meaning: give me rows that have no .disabled element inside.

3. hasText

Keep the element only if its text contains the given text (or matches a regex). It is not case-sensitive and matches part of the text.

const row = page.locator('tr').filter({ hasText: 'Finn Allen' });
const row2 = page.locator('tr').filter({ hasText: /finn/i });   // regex

4. hasNotText

The opposite of hasText. Keep the element only if its text does not contain the given text.

5. visible

Keep only elements that are visible (true) or hidden (false) on the page.

const buttons = page.locator('button').filter({ visible: true });

Option	                    Checks	                      Takes	                               Keeps element when
has	                      Child element	                 A locator	                           It contains that child
hasNot	                  Child element	                 A locator	                           It does not contain that child
hasText	                  Text	                         String or regex	                   Its text includes that text
hasNotText	              Text	                         String or regex	                   Its text does not include that text
visible	                  Visibility	                 true / false	                       It matches the visibility
});
*/

test("has option", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");

    await page
        .locator("div[class='form_group']")
        .filter({ has: page.locator("input[placeholder='Username']") })
        .locator("input")
        .fill("standard_user");

    // await page.waitForTimeout(1000);


    //has not

    await page
        .locator("div[class='form_group']")
        .filter({ hasNot: page.locator("input[placeholder='Username']") })
        .locator("input")
        .fill("secret_sauce");

    // await page.waitForTimeout(1000);

    //has

    await page.locator("form[aria-label='Login']")
        .locator("input[id='login-button']").first()
        .click();

    // await page.waitForTimeout(1000);

    await page.locator("//a")
        .filter({ hasText: "Sauce Labs Backpack" })
        .click();
    // await page.waitForTimeout(1000);

    await page.locator(".left_component").filter({ has: page.locator("button[id='back-to-products']") }).click();

    await page.locator(".inventory_item_name", { hasNotText: /Sauce*/ }).click();

    // await page.waitForTimeout(1000);
});
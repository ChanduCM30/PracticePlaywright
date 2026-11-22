/*
Locators Method with different types of selectors in playwright.

Locators: locators represents a way to find elements on a web page. 
They are used to interact with elements, perform actions, and make assertions in Playwright tests.
locators are created using various selector strategies, such as CSS selectors, XPath expressions, text content, and more.

Locator Method: The locator method is used to create a locator for an element on the page.
It takes a selector as an argument and returns a Locator object that can be used to interact with the element.

Here's an example of using the locator method in Playwright:

import { test, expect } from '@playwright/test';

test('example test using locator method', async ({ page }) => {
  // Navigate to a URL
  await page.goto('https://example.com');

  // Create a locator for an element using a CSS selector
  const exampleLink = page.locator('a.example-link');

  // Perform actions on the element
  await exampleLink.click();

  // Make assertions about the element's state
  await expect(exampleLink).toHaveText('Example Link');
}


Locator method usage
 page.locator(selector: string): Locator
 page.locator(selector:string,options: LocatorOptions): Locator


 Different types of selectors in playwright
1. CSS Selectors: CSS selectors are used to select elements based on their CSS properties, such as class names, IDs, and attributes.
Example: page.locator('.my-class') or page.locator('#my-id')

2. XPath Selectors: XPath selectors are used to select elements based on their XML path in the document structure.
Example: page.locator('//div[@class="my-class"]')

3. Text Selectors: Text selectors are used to select elements based on their visible text content.
Example: page.locator('text=Click me')

4. Role Selectors: Role selectors are used to select elements based on their ARIA roles.
Example: page.locator('[role="button"]')

5. Test ID Selectors: Test ID selectors are used to select elements based on custom data attributes, often used for testing purposes.
Example: page.locator('[data-testid="my-element"]')
*/


import { test, expect } from "@playwright/test";

test("gets product details by product name", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  const productName = "Sauce Labs Backpack";
  const productCard = page
    .locator(".inventory_item")
    .filter({ has: page.getByText(productName, { exact: true }) })
    .first();

  await expect(productCard).toBeVisible();
  const productText = (await productCard.innerText())
    .split("\n")
    .map((text) => text.trim())
    .filter(Boolean);

  expect(productText[0]).toContain(productName);
  console.log({
    ProductName: productName,
    Price: productText[productText.length - 1],
  });
});


test("Find product details of a particular item", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  const productName = "Sauce Labs Bike Light";
  const productCard = page
    .locator(".inventory_item")
    .filter({ has: page.getByText(productName, { exact: true }) });

  await expect(productCard).toBeVisible();

  const cells = await productCard.locator(".inventory_item_desc").allInnerTexts();
  const price = await productCard.locator(".inventory_item_price").allInnerTexts();

  const productDetails = {
    ProductName: productName,
    Description: cells[0],
    Price: price[0],
  };

  console.log(productDetails);
});
import { test, expect, chromium } from "@playwright/test";

test("start playwright with typescript ", async ({ page }) => {

    //A Promise is an object that represents the eventual result of an asynchronous operation.

    /*
    const p: Promise<number> = new Promise((resolve, reject) => {
  setTimeout(() => resolve(200), 1000);
});
    Three states
 State	         Meaning
Pending	    Work is still in progress
Fulfilled	Finished successfully, with a value (resolve)
Rejected	Failed, with an error (reject)


await / async in Typescript
The async keyword is used to declare an asynchronous function.
An async function returns a Promise implicitly, and
the await keyword can be used inside an async function to pause execution until the Promise is resolved or rejected.

Here's a simple example:

typescript
Copy code
async function fetchData() {
try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
} catch (error) {
    console.error('Error fetching data:', error);
}
}

fetchData();
In this example, the fetchData function is declared as async. Inside the function, we use await to wait for the 
fetch operation to complete before proceeding to parse the response as JSON. If any error occurs during the fetch or parsing, 
it will be caught in the catch block.
    */
    await page.goto("https://google.com");
    await page.getByRole('button', { name: 'Google apps' }).click();
    console.log("start playwright with typescript");
    await page.waitForTimeout(2000);

    /*
    Page Fixture in Playwright
In Playwright, a fixture is a way to set up and tear down resources needed for your tests. 
The Page fixture is one of the built-in fixtures provided by Playwright, which represents a single tab or page in the browser.

When you use the Page fixture in your tests, Playwright automatically creates a new page for each test and provides it as an argument to your test function. 
This allows you to interact with the page, navigate to URLs, perform actions, and make assertions.

Here's an example of how to use the Page fixture in a Playwright test:

import { test, expect } from '@playwright/test';

test('example test using Page fixture', async ({ page }) => {
  // Navigate to a URL
await page.goto('https://example.com');

  // Perform actions on the page
await page.click('text=More information');

  // Make assertions
const title = await page.title();
expect(title).toBe('Example Domain');
});
In this example, the test function receives the Page fixture as an argument (named page). 
You can use this page object to interact with the web page, such as navigating to a URL, clicking elements, and 
making assertions about the page's state.

The Page fixture is automatically managed by Playwright, so you don't need to worry about creating or closing pages manually. 
Each test gets a fresh page instance, ensuring isolation between tests.
    */
})

test("start playwright with typescript 2", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://google.com");
    await page.getByRole('button', { name: 'Google apps' }).click();
    await page.waitForTimeout(2000);
    await browser.close();
})
/*
Assertions in Playwright

An assertion is a check that decides whether a test passes. 
The syntax is expect(received).matcher(expected).

1. Two kinds of assertions
                   Web-first (auto-retrying)	                                  Generic (non-retrying)
Used on	           Locator, Page, API response	                                  Plain values, arrays, objects
Needs await	       Yes	                                                          No
Behavior	       Retries until the condition is met or the timeout is reached	  Checks once and does not retry
Example	           await expect(locator).toHaveText('Done')	                      expect(count).toBe(5) 


Using non-retrying assertions on content that loads asynchronously can make a test flaky, so prefer web-first assertions for anything on the page


2. Locator assertions (element checks)

State

Assertion	                            Checks that the element...
toBeVisible()	                        is visible
toBeHidden()	                        is hidden or not in the DOM
toBeAttached()	                        exists in the DOM
toBeInViewport()	                    intersects the visible viewport
toBeEnabled() / toBeDisabled()	        is enabled / disabled
toBeEditable()	                        can be edited
toBeChecked()	                        checkbox or radio is checked
toBeFocused()	                        has focus
toBeEmpty()	                            has no text or children


Content and value

Assertion	                            Checks that the element...
toHaveText()	                        text matches fully (string, regex, or array for lists)
toContainText()	                        text includes the given part
toHaveValue()	                        input has this value
toHaveValues()	                        multi-select has these options selected


Attributes, classes, style

Assertion	                           Checks that the element...
toHaveAttribute(name, value)	       has the attribute
toHaveClass()	                       class attribute matches
toContainClass()	                   has the named classes in any order, ignoring others
toHaveId()	                           has this id
toHaveCSS(prop, value)	               computed CSS property matches
toHaveJSProperty()	                   JavaScript property matches


Structure and accessibility

Assertion	                          Checks that...
toHaveCount(n)	                      the locator matches exactly n elements
toHaveRole()	                      element has this ARIA role
toHaveAccessibleName()	              accessible name matches
toHaveAccessibleDescription()	      accessible description matches
toMatchAriaSnapshot()	              accessibility tree matches a given snapshot
toHaveScreenshot()	                  element looks like the stored image

*/
import { test, expect } from '@playwright/test';
test('Assertions in Playwright', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    await expect(page.getByPlaceholder('Username')).toHaveAttribute('type', 'text');
    await expect(page.getByPlaceholder('Password')).toHaveAttribute('type', 'password');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/\/inventory/);
    await expect(page.locator('.inventory_item')).toHaveCount(6);
    const firstInventoryItem = page.locator('.inventory_item_name').first();
    await expect(firstInventoryItem).toHaveText(/Sauce Labs/);
})

/*
3. Page assertions
Assertion	Checks that the page...
toHaveTitle()	title matches (string or regex)
toHaveURL()	URL matches (string, regex, or predicate)
toHaveScreenshot()	looks like the stored screenshot
toMatchAriaSnapshot()	matches an accessibility snapshot

await expect(page).toHaveTitle(/Dashboard/);
await expect(page).toHaveURL(/dashboard/);


4. API response assertions
Assertion	Checks that the response...
toBeOK()	has status 200 to 299

const response = await request.get('/api/users');
await expect(response).toBeOK();
expect(response.status()).toBe(200);


6. Negation with .not

Add .not before any matcher to reverse it.

await expect(locator).not.toBeVisible();
await expect(page).not.toHaveURL(/login/);
expect(list).not.toContain('x');

7. Special expect modes

Soft assertions: a failed soft assertion does not stop the test but still marks it as failed. Useful for checking many fields in one run.

await expect.soft(page.getByTestId('status')).toHaveText('Success');
await expect.soft(page.getByTestId('eta')).toHaveText('1 day');
expect(test.info().errors).toHaveLength(0);   // stop if any soft check failed


Custom message: the second argument appears in the failure report.
await expect(page.getByText('Name'), 'should be logged in').toBeVisible();


Custom timeout: pass it per assertion, or set a default once in config.

await expect(locator).toBeVisible({ timeout: 10000 });

// playwright.config.ts
export default defineConfig({ expect: { timeout: 10_000 } });

expect.configure: creates a pre-configured expect, for example a soft one or one with a longer timeout.
const softExpect = expect.configure({ soft: true });
const slowExpect = expect.configure({ timeout: 20000 });


8. Snapshot and visual assertions
Assertion	                     Compares
toHaveScreenshot()	             Screenshot against a stored image
toMatchSnapshot()	             Text, buffer, or other data against a stored file
toMatchAriaSnapshot()	         Accessibility tree against a YAML-style snapshot

The first run saves the baseline. Later runs compare against it, and --update-snapshots refreshes it.



Interview answers

Q: What are web-first assertions?

Assertions on locators, pages, and responses that automatically retry until the condition is true or the timeout expires, so they handle asynchronous UI updates without manual waits.

Q: toBe vs toEqual?

toBe checks identity (same primitive value or same reference). toEqual compares contents deeply, so two separate objects with equal properties pass.

Q: toHaveText vs toContainText?

toHaveText matches the whole text (or an exact list), while toContainText passes when the text includes the given part.

Q: Soft vs hard assertions?

A hard assertion stops the test at the first failure. A soft one records the failure, continues, and still fails the test at the end.

Q: Why is expect(await locator.textContent()) risky?

It reads the value once and then asserts with no retry, so a slow page causes false failures. Pass the locator to expect instead.

Q: What is expect.poll used for?

Retrying a plain async function (such as an API call) until its result satisfies the matcher.

The exact list grows with new Playwright versions, so check the official Assertions page for the version in your project.

If you want, I can add this as a new section in your TypeScript notes doc, or write a practice test using these assertions on a real page.


*/

test('Assertions in Playwright - Practice Test', async ({ page }) => {


    await page.goto("https://www.saucedemo.com/");

    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveTitle(/Swag Labs/);
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByRole('button', { name: 'Add to cart' }).first()).toBeEnabled();
    await expect(page.getByRole('button', { name: 'Add to cart' }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add to cart' }).first()).toHaveText('Add to cart');
    await expect(page.getByText('Sauce Labs Backpack')).toHaveAttribute('class', 'inventory_item_name ');
})
import { expect, test } from "@playwright/test";

test("Dropdown test", async ({ page }) => {

    await page.goto("https://artoftesting.com/samplesiteforselenium");

    const dropdown = page.locator("#testingDropdown");

    await dropdown.scrollIntoViewIfNeeded();

    await dropdown.selectOption({ label: "Performance Testing" });

    await expect(dropdown).toHaveValue("Performance");

    await page.waitForTimeout(2000);

    await dropdown.selectOption({ index: 3 });

    await expect(dropdown).toHaveValue("Database");

    await page.waitForTimeout(2000);

    await dropdown.selectOption({ value: "Manual" });

    await expect(dropdown).toHaveValue("Manual");

    await page.waitForTimeout(2000);


});


test("Dropdown test2", async ({ page }) => {

    await page.goto("https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_option_label");

    const frame = page.frameLocator("iframe#iframeResult");

    const dropdown = frame.locator("#cars");

    await dropdown.selectOption({ label: "Audi" });

    await expect(dropdown).toHaveValue("Audi (Auto Union Deutschland Ingolstadt)");

    await page.waitForTimeout(2000);

    await dropdown.selectOption({ index: 1 });

    await expect(dropdown).toHaveValue("Saab (Swedish Aeroplane AB)");

    await page.waitForTimeout(2000);
})

test("Multi Select Dropdown test", async ({ page }) => {

    await page.goto("https://demoqa.com/select-menu");

    const dropdown = page.locator("#cars");

    await dropdown.scrollIntoViewIfNeeded();

    await page.waitForTimeout(2000);

    // await dropdown.selectOption([{ label: "Volvo" }, { index: 1 }, { value: "audi" }]);

    await dropdown.selectOption(['volvo', 'saab', 'audi']);

    await expect(dropdown).toHaveValues(["volvo", "saab", "audi"]);

    await page.waitForTimeout(2000);
})
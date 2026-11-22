import { test, expect } from "@playwright/test";

test("Visual Testing", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/tables");
    // await expect(page).toHaveScreenshot();
    // await expect(page).toHaveScreenshot("Visual Testing Idetification.png");
    // await expect(page).toHaveScreenshot(["ChildFolder3","ChildFolder4", "VisualTestingSample.png"])
    await expect(page).toHaveScreenshot(["ChildFolder1/ChildFolder2", "VisualTestingSample.png"])
    await page.close();
})

test("Visual Testing2", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/tables");
    // await expect(page).toHaveScreenshot(["ChildFolder1/ChildFolder2", "FullPage.png"],{fullPage:true})
    // await expect(page).toHaveScreenshot("MaxDifference.png",{maxDiffPixels:400})

    // await expect(page).toHaveScreenshot("MaxDifferencePixelRatio.png",{maxDiffPixelRatio:0.40})

    // await expect(page).toHaveScreenshot("MaskVisualTesting.png",{mask:[page.locator("#table1 tbody tr td:nth-child(4)")]});

    await expect(page.locator("#table1 tbody")).toHaveScreenshot("Table2.png", { mask: [page.locator("#table1 tbody tr td:nth-child(4)")] })
    await page.close();
})

test("Visual Testing I frame hiding", async ({ page }) => {
    await page.goto("https://demoqa.com/forms");

    await expect(page).toHaveScreenshot("Iframe.png", { stylePath: 'screenshot.css' });

    await page.close();
})
import { test, expect } from "@playwright/test";

// test.use({storageState:{cookies:[],origins:[]}})

test.beforeEach("Authentication state verification", async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    // await page.getByPlaceholder("Username").fill("Admin");
    // await page.getByPlaceholder("Password").fill("admin123");
    // await page.getByRole("button", { name: "Login", exact: true }).click();
    // await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
});

test("Time sheet card navigation on dashboard page", async ({ page,context }) => {
    await context.clearCookies();
    await expect(page.locator("button[class='oxd-icon-button orangehrm-quick-launch-icon'][title='Timesheets']")).toBeVisible();
    await page.locator("button[class='oxd-icon-button orangehrm-quick-launch-icon'][title='Timesheets']").click();
    await expect(page.locator("span[class='oxd-topbar-body-nav-tab-item']").first()).toContainText("Timesheets ")
    await page.waitForTimeout(1000);
});

test("Add the candidate for the recruitment", async ({ page }) => {
    await page.getByRole("link", { name: "Recruitment" }).click();
    await page.getByRole("button", { name: " Add " }).click();
    await expect(page.getByRole('heading', { name: 'Add Candidate' })).toBeVisible();
    await page.getByPlaceholder("First Name").fill("Akash");
    await page.getByPlaceholder("Middle Name").fill("Singhania");
    await page.getByPlaceholder("Last Name").fill("Malhotra");
    await page.getByPlaceholder("Type here").first().fill("akashmalhotra64738@gmail.com");
    await page.getByPlaceholder("Type here").nth(2).fill("7489347294");

    const uploadPromise = page.waitForEvent('filechooser');
    await page.locator(".oxd-file-button").click();
    const fileChoose = await uploadPromise;
    await fileChoose.setFiles("download/Athagry.pdf");
    await page.locator("button[type='Submit']").click();
    await page.waitForTimeout(5000);
    await expect(page.getByRole('heading', { name: 'Application Stage' })).toBeVisible();
});

test("Verify apply leave card navigation on dashboard page", async ({ page }) => {

    await expect(page.locator("button[class='oxd-icon-button orangehrm-quick-launch-icon'][title='Apply Leave']")).toBeVisible();
    await page.locator("button[class='oxd-icon-button orangehrm-quick-launch-icon'][title='Apply Leave']").click();
    await expect(page.locator(".oxd-topbar-body-nav-tab-item").nth(1)).toContainText("My Leave")
    await page.waitForTimeout(1000);
});
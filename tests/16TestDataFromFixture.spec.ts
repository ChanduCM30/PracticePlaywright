import { test, expect } from "../fixtures/TestDataFixture";



test.beforeEach("Authentication state verification", async ({ page,loginData }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.getByPlaceholder("Username").fill(loginData.username);
    await page.getByPlaceholder("Password").fill(loginData.password);
    await page.getByRole("button", { name: "Login", exact: true }).click();
    await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
});


test("Add the candidate for the recruitment", async ({ page,testData }) => {
    await page.getByRole("link", { name: "Recruitment" }).click();
    await page.getByRole("button", { name: " Add " }).click();
    await expect(page.getByRole('heading', { name: 'Add Candidate' })).toBeVisible();
    await page.getByPlaceholder("First Name").fill(testData.firstName);
    await page.getByPlaceholder("Middle Name").fill(testData.middleName);
    await page.getByPlaceholder("Last Name").fill(testData.lastName);
    await page.getByPlaceholder("Type here").first().fill(testData.email);
    await page.getByPlaceholder("Type here").nth(1).fill(testData.phone);

    const uploadPromise = page.waitForEvent('filechooser');
    await page.locator(".oxd-file-button").click();
    const fileChoose = await uploadPromise;
    await fileChoose.setFiles("download/Athagry.pdf");
    await page.getByRole("button", { name: "Save", exact: true }).click();
    await expect(page.getByText("Successfully Saved", { exact: true })).toBeVisible();
});


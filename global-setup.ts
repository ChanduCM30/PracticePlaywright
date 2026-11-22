// import { chromium, expect } from "@playwright/test";


// async function globalSetup() {
//     const browser = await chromium.launch();
//     const context = await browser.newContext()
//     const page = await context.newPage();
//     await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
//     await page.getByPlaceholder("Username").fill("Admin");
//     await page.getByPlaceholder("Password").fill("admin123");
//     await page.getByRole("button", { name: "Login", exact: true }).click();
//     await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
//     await page.context().storageState({path:"./playwright/.auth/auth2.json"})
// }

// export default globalSetup;
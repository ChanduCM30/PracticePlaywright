import { test, expect } from "@playwright/test";
import * as XLSX from 'xlsx'
import fs from "node:fs";
import { parse } from "csv-parse/sync"

const csvData = fs.readFileSync(
    'testData/login.csv',
    'utf-8'
)

type LoginData = {
    username: string;
    password: string;
};

const loginData: LoginData[] = parse(csvData, {
    columns: true,
    skip_empty_lines: true,
    trim: true
});
const credentials = loginData[0];

if (!credentials) {
    throw new Error("No login credentials found in testData/login.csv");
}



// test.beforeEach("Authentication state verification", async ({ page }) => {
//     await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
//     await page.getByPlaceholder("Username").fill(logindata.username);
//     await page.getByPlaceholder("Password").fill(logindata.password);
//     await page.getByRole("button", { name: "Login", exact: true }).click();
//     await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
// });

test.beforeEach("Authentication state verification", async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login", {
        waitUntil: "domcontentloaded"
    });
    await page.getByPlaceholder("Username").fill(credentials.username);
    await page.getByPlaceholder("Password").fill(credentials.password);
    await page.getByRole("button", { name: "Login", exact: true }).click();
    await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
});

// candidateData.forEach((data) => {
//     test(`Add the ${data.firstName} candidate for the recruitment`, async ({ page }) => {
//         await page.getByRole("link", { name: "Recruitment" }).click();
//         await page.getByRole("button", { name: " Add " }).click();
//         await expect(page.getByRole('heading', { name: 'Add Candidate' })).toBeVisible();
//         await page.getByPlaceholder("First Name").fill(data.firstName);
//         await page.getByPlaceholder("Middle Name").fill(data.middleName);
//         await page.getByPlaceholder("Last Name").fill(data.lastName);
//         await page.getByPlaceholder("Type here").first().fill(data.email);
//         await page.getByPlaceholder("Type here").nth(1).fill(data.phone);

//         const uploadPromise = page.waitForEvent('filechooser');
//         await page.locator(".oxd-file-button").click();
//         const fileChoose = await uploadPromise;
//         await fileChoose.setFiles("download/Athagry.pdf");
//         await page.getByRole("button", { name: "Save", exact: true }).click();
//         await expect(page.getByText("Successfully Saved", { exact: true })).toBeVisible();
//         await page.close();
//     });
// })

type candidatesType = {
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    phone: string
}

const csv = fs.readFileSync('testData/candidatesData.csv', 'utf-8');

const candidatesData: candidatesType[] = parse(csv, {
    columns: true,
    skip_empty_lines: true,
    trim: true
})

// candidatesData.forEach((data) => {
//     test(`Add the ${data.email} candidate for the recruitment`, async ({ page }) => {
//         await page.getByRole("link", { name: "Recruitment" }).click();
//         await page.getByRole("button", { name: " Add " }).click();
//         await expect(page.getByRole('heading', { name: 'Add Candidate' })).toBeVisible();
//         await page.getByPlaceholder("First Name").fill(data.firstName);
//         await page.getByPlaceholder("Middle Name").fill(data.middleName);
//         await page.getByPlaceholder("Last Name").fill(data.lastName);
//         await page.getByPlaceholder("Type here").first().fill(data.email);
//         await page.getByPlaceholder("Type here").nth(1).fill(data.phone);

//         const uploadPromise = page.waitForEvent('filechooser');
//         await page.locator(".oxd-file-button").click();
//         const fileChoose = await uploadPromise;
//         await fileChoose.setFiles("download/Athagry.pdf");
//         await page.getByRole("button", { name: "Save", exact: true }).click();
//         await expect(page.getByText("Successfully Saved", { exact: true })).toBeVisible();
//         await page.close();
//     });
// })




//Read Excel from Workbook

const workbook = XLSX.readFile('testData/users.xlsx');

//Get workSheet
const sheetName = workbook.SheetNames[0];
if (!sheetName) {
    throw new Error("No worksheets found in testData/users.xlsx");
}
const sheet = workbook.Sheets[sheetName];
if (!sheet) {
    throw new Error(`Worksheet "${sheetName}" not found in testData/users.xlsx`);
}


//Convert Excel data into Json data
const Data: candidatesType[] = XLSX.utils.sheet_to_json(sheet, {
    defval: '',
    raw: false
});

if (Data.length === 0) {
    throw new Error("No candidate records present in testData/users.xlsx");
}

Data.forEach((data) => {
    test(`Add the ${data.phone} candidate for the recruitment`, async ({ page }) => {
        await page.getByRole("link", { name: "Recruitment" }).click();
        await page.getByRole("button", { name: " Add " }).click();
        await expect(page.getByRole('heading', { name: 'Add Candidate' })).toBeVisible();
        await page.getByPlaceholder("First Name").fill(data.firstName);
        await page.getByPlaceholder("Middle Name").fill(data.middleName);
        await page.getByPlaceholder("Last Name").fill(data.lastName);
        await page.getByPlaceholder("Type here").first().fill(data.email);
        await page.getByPlaceholder("Type here").nth(1).fill(data.phone);

        const uploadPromise = page.waitForEvent('filechooser');
        await page.locator(".oxd-file-button").click();
        const fileChoose = await uploadPromise;
        await fileChoose.setFiles("download/Athagry.pdf");
        await page.getByRole("button", { name: "Save", exact: true }).click();
        await expect(page.getByText("Successfully Saved", { exact: true })).toBeVisible();
        await page.close();
    });
})



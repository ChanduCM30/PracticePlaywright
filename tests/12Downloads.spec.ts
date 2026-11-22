import { test, expect } from "@playwright/test";
import * as path from "node:path";
import * as fs from "node:fs";
import * as XLSX from 'xlsx';
import pdf from 'pdf-parse';
import { parse } from 'csv-parse/sync'

test("Handling downloads", async ({ page }) => {

    await page.goto("https://playwright-playground.com/forms/file-download");

    const downloadPromise = page.waitForEvent('download');

    await page.locator(".button-row button").click();

    const download = await downloadPromise;

    const fileName = download.suggestedFilename();

    console.log("File name is : ", fileName);

    const filePath = path.join('download', fileName);

    console.log("File Saved : ", filePath);

    await download.saveAs(filePath)
})

test("Handling downloads2", async ({ page }) => {

    await page.goto("https://playwright-playground.com/forms/file-download");

    await page.locator("#export-format").selectOption({ value: 'json' })

    const downloadPromise = page.waitForEvent('download');

    await page.locator(".button-row button").click();

    const download = await downloadPromise;

    const fileName = download.suggestedFilename();

    console.log("File name is : ", fileName);

    const filePath = path.join('download', fileName);

    console.log("File Saved : ", filePath);

    await download.saveAs(filePath)


})


test("Read files json", async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/download");

    const downloadPromise = page.waitForEvent('download');

    await page.getByText("sample.json").click();

    const download = await downloadPromise;

    const fileName = download.suggestedFilename();

    const filePath = path.join('download', fileName);

    console.log('File Name ', fileName);

    console.log("File Path ", filePath);

    await download.saveAs(filePath);

    //Read Json file

    const jsondata = fs.readFileSync(filePath, "utf-8");

    // Convert JSON string into JavaScript object


    const data = JSON.parse(jsondata);

    console.log(data);

    // Validate JSON content
    expect(data.users).toHaveLength(2);

    expect(data.users[0]).toMatchObject({
        id: 1, name: 'Tom Smith'
    })
})


test("Read files PDF", async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/download");

    const downloadPromise = page.waitForEvent('download');

    await page.getByText("Athagry.pdf").click();

    const download = await downloadPromise;

    const fileName = download.suggestedFilename();

    const filePath = path.join('download', fileName);

    console.log('File Name ', fileName);

    console.log("File Path ", filePath);

    await download.saveAs(filePath);

    //Read PDF file as buffer

    const bufferPDF = fs.readFileSync(filePath);

    //Extract PDF text

    const pdfData = await pdf(bufferPDF);

    const pdfTxt = pdfData.text;

    console.log(pdfTxt)

    expect(pdfTxt).toContain('Organic farming');
    expect(pdfTxt).toContain('Cover cropping');

})

test("Read files XLSX", async ({ page }) => {

    await page.goto("https://testingfile.com/spreadsheets/xlsx");

    const downloadPromise = page.waitForEvent('download');

    await page.locator("a[download='sample-xlsx-10-rows.xlsx']").click();

    const download = await downloadPromise;

    const fileName = download.suggestedFilename();

    const filePath = path.join('download', fileName);

    console.log('File Name ', fileName);

    console.log("File Path ", filePath);

    await download.saveAs(filePath);

    // Read Excel workbook

    const workbook = XLSX.readFile(filePath);

    //Get first workbook
    const sheetName = workbook.SheetNames[0];

    const worksheet = workbook.Sheets[sheetName];

    //Convert worksheet into JSON records

    const data = XLSX.utils.sheet_to_json(worksheet);

    console.log(data)

    expect(data).toHaveLength(10);

    expect(data[0]).toMatchObject({
        ID: 1,
        Name: 'Alex Morgan',
        Email: 'sample1@example.com'
    });

})

test("Read files CSV", async ({ page }) => {

    await page.goto("https://www.datablist.com/learn/csv/download-sample-csv-files");

    const downloadPromise = page.waitForEvent('download');

    await page.getByText("people-100.csv").click();

    const download = await downloadPromise;

    const fileName = download.suggestedFilename();

    const filePath = path.join('download', fileName);

    console.log('File Name ', fileName);

    console.log("File Path ", filePath);

    await download.saveAs(filePath);

    expect(fs.existsSync(filePath)).toBeTruthy();

    // Read CSV file

    const csvData = fs.readFileSync(filePath, 'utf-8');

    //Convert CSV data into JSON Record

    const data = parse(csvData, {
        columns: true,
        skip_empty_lines: true,
        trim: true
    })

    console.log(data)

    expect(data).toHaveLength(100);

})
import { test, expect } from "@playwright/test";


test("File upload1", async ({ page }) => {
    await page.goto("https://davidwalsh.name/demo/multiple-file-upload.php");

    await page.locator("#filesToUpload").setInputFiles(['download/Athagry.pdf', 'download/users.csv', 'download/users.json'])

    await expect(page.locator("#fileList li")).toContainText(['Athagry.pdf', 'users.csv', 'users.json']);

    await page.locator("#filesToUpload").setInputFiles([])

    await page.waitForTimeout(2000);

    await page.locator("#filesToUpload").setInputFiles([{
        name: "sample.txt",
        mimeType: 'text/plain',
        buffer: Buffer.from("Hi I am natorious")
    }, {
        name: "Hello.json",
        mimeType: 'application/json',
        buffer: Buffer.from(
            JSON.stringify({
                username: "Admin",
                password: "admin123"
            })
        )
    }])

    await page.waitForTimeout(2000);
    await page.close()
})

test("Upload file", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/upload");

    const file = page.locator("#file-upload");

    await file.setInputFiles({
        name: "david.txt",
        mimeType: "text/plain",
        buffer: Buffer.from("Hi David")
    })

    await page.waitForTimeout(2000);

    await page.locator("#file-submit").click();
    await expect(page.locator("h3")).toHaveText("File Uploaded!")

    await page.close();
})

test("Upload file by fileChooser", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/upload");

    const file = page.locator("#file-upload");

    const filePromise = page.waitForEvent('filechooser');

    await file.click();

    const fileChoose = await filePromise;

    fileChoose.setFiles({
        name: 'Raily.json',
        mimeType: "application/json",
        buffer: Buffer.from(
            JSON.stringify({
                name: "Raily",
                place: "USA"
            })
        )
    })

    await page.waitForTimeout(2000);

    await page.locator("#file-submit").click();
    await expect(page.locator("h3")).toHaveText("File Uploaded!")

    await page.close();
})
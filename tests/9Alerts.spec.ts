import {test,expect} from '@playwright/test';

test('Alert test',async({page})=>{

    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

    await page.once("dialog", async (dialog)=>{

        console.log(dialog.type());
        console.log(dialog.message());
        expect(dialog.type()).toBe("alert");
        expect(dialog.message()).toBe("I am a JS Alert");
        await dialog.accept();

    });

    await page.locator("text=Click for JS Alert").click();
    await expect(page.locator("#result")).toHaveText("You successfully clicked an alert");
    await page.waitForTimeout(2000);
})

test('JS Confirm test',async({page})=>{

    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

    await page.once("dialog", async (dialog)=>{

        console.log(dialog.type());
        console.log(dialog.message());
        expect(dialog.type()).toBe("confirm");
        expect(dialog.message()).toBe("I am a JS Confirm");
        await page.waitForTimeout(1000);
        await dialog.dismiss();

    });

    await page.locator("text=Click for JS Confirm").click();
    await expect(page.locator("#result")).toHaveText("You clicked: Cancel");
    await page.waitForTimeout(2000);
})



test('JS Prompt test',async({page})=>{

    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

    await page.once("dialog", async (dialog)=>{

        console.log(dialog.type());
        console.log(dialog.message());
        expect(dialog.type()).toBe("prompt");
        expect(dialog.message()).toBe("I am a JS prompt");
        await page.waitForTimeout(1000);
        await dialog.accept("Playwright");

    });

    await page.locator("text=Click for JS Prompt").click();
    await expect(page.locator("#result")).toHaveText("You entered: Playwright");
    await page.waitForTimeout(2000);
})
import {test,expect} from "@playwright/test";

test("Report Practice1", async({page})=>{
    await page.goto("https://google.com");
    await expect(page).toHaveTitle("Google")
})

test("Report Practice2", async({page})=>{
    await page.goto("https://google.com");
    await expect(page).toHaveTitle("Google")
})

test("Report Practice3", async({page})=>{
    await page.goto("https://google.com");
    await expect(page).toHaveTitle("Google")
})
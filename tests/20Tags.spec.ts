import { test, expect } from "@playwright/test";

test.describe("Describe block", async () => {

    test("Tags demo1 @UI", async ({ page }) => {
        console.log("Practice test1")
    })

    test("Tags demo2 @Smoke", async ({ page }) => {
        console.log("Practice test2")
    })

    test("Tags demo3 @Regression", async ({ page }) => {
        console.log("Practice test3")
    })


})

test("Tags demo4 @UI", async ({ page }) => {
    console.log("Practice test4")
})

test("Tags demo5 @Smoke", async ({ page }) => {
    console.log("Practice test5")
})

test("Tags demo6 @Regression", async ({ page }) => {
    console.log("Practice test6")
})


test("Tags demo7 ", { tag: "@System" }, async ({ page }) => {
    console.log("Practice test7")
})

test("Tags demo8 ", { tag: "@Smoke" }, async ({ page }) => {
    console.log("Practice test8")
})

test("Tags demo9 ", { tag: ["@UI","@Smoke"] }, async ({ page }) => {
    console.log("Practice test9")
    await page.close()
})

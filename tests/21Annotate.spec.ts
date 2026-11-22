import { test, expect } from "@playwright/test";

test("Annotate Demo", {
    annotation: {
        type: "Jira Story",
        description: "https://demoqa.com/droppable"
    }
}, async ({ page }) => {
    await page.goto("https://www.google.com");
    await expect(page).toHaveTitle("Google");
})

test("Annotate Demo2", {
    tag: "@Smoke",
    annotation: [
        {
            type: "Jira Story",
            description: "https://demoqa.com/droppable"
        },
        {
            type: "Docker Story",
            description: "https://demoqa.com/droppable"
        }
    ]
}, async ({ page }) => {
    await page.goto("https://www.google.com");
    await expect(page).toHaveTitle("Google");
})




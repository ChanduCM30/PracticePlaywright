import { expect, test, type Frame } from "@playwright/test";

test("Frames test", async ({ page }) => {
    await page.goto("https://playwrightlab.github.io/");

    await page.locator("#iframeCardHeader").scrollIntoViewIfNeeded();

    const frame = page.frameLocator("#practiceFrame");
    const nameInput = frame.locator("#iframeName");

    await nameInput.fill("Playwright");

    await expect(nameInput).toHaveValue("Playwright");
});

test("Frames test2", async ({ page }) => {
    await page.goto("https://playwrightlab.github.io/");

    const frameNavigation = page.waitForEvent(
        "framenavigated",
        { predicate: frame => frame.url().includes("iframe-content.html") },
    );
    await page.locator("#practiceFrame").scrollIntoViewIfNeeded();
    await frameNavigation;

    const frame = page.frame({ url: /iframe-content\.html/ });
    if (!frame) {
        throw new Error("Practice iframe not found");
    }

    const nameInput = frame.locator("#iframeName");
    await nameInput.fill("Playwright");
    await expect(nameInput).toHaveValue("Playwright");

    const messageInput = frame.locator("#iframeMessage");
    await messageInput.fill("Hello from Playwright");
    await expect(messageInput).toHaveValue("Hello from Playwright");
});

test("Frames test3", async ({ page }) => {
    await page.goto("https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_input_form");

    const frame = page.frame("iframeResult");

    if (!frame) {
        throw new Error("Frame not present");
    }

    await frame.locator("#fname").fill("Playwright");
    await expect(frame.locator("#fname")).toHaveValue("Playwright");

    await frame.locator("input[type=submit]").click();

    await page.waitForTimeout(2000);

    const resultFrame = page.frame("iframeResult");
    if (!resultFrame) {
        throw new Error("Result Frame not present");
    }
    await expect(resultFrame.getByText("Submitted Form Data")).toBeVisible();

    await page.waitForTimeout(1000);
})

test("Frames test4", async ({ page }) => {
    await page.goto("https://playwrightlab.github.io/");

    console.log("Number of frames on the page: ", page.frames().length);
    await page.locator("#practiceFrame").scrollIntoViewIfNeeded();

    const frame = page.frameLocator("#nestedFramesFrame").frameLocator("#innerFrame");

    const nameInput = frame.locator("#iframeName");
    await nameInput.fill("Playwright");
    await expect(nameInput).toHaveValue("Playwright");

    const messageInput = frame.locator("#iframeMessage");
    await messageInput.fill("Hello from Playwright");
    await expect(messageInput).toHaveValue("Hello from Playwright");

    const priority = frame.locator("#iframePriority");

    await priority.selectOption({ value: "high" });
    await expect(priority).toHaveValue("high");

    await frame.locator("#iframeUrgent").check();
    await expect(frame.locator("#iframeUrgent")).toBeChecked();

    await page.waitForTimeout(2000);

    await frame.locator("#iframeSubmitBtn").click();

    await expect(frame.locator("#iframeResult")).toBeVisible();
});


test("Frames test5", async ({ page }) => {
    await page.goto("https://playwrightlab.github.io/");

    const frameNavigation = page.waitForEvent(
        "framenavigated",
        frame => frame.url().startsWith("https://playwright.dev/"),
    );
    await page.locator("#externalFrame").scrollIntoViewIfNeeded();
    await frameNavigation;

    const frame = page.frameLocator("#externalFrame")

    if (!frame) {
        throw new Error("External frame not found");
    }

    const footer = frame.locator(".footer__copyright");
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();
});
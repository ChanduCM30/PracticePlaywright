import { test, expect } from "@playwright/test";

test("Drag and Drop1", async ({ page }) => {

    await page.goto("https://demoqa.com/droppable");

    const source = page.locator("#draggable");

    await expect(source).toBeVisible();

    const target = page.locator("#droppable").first();

    await expect(target).toBeVisible();
    await expect(source).toHaveClass(/ui-draggable/);
    await expect(target).toHaveClass(/ui-droppable/);
    //In Playwright, steps in dragTo() specifies the number of intermediate mouse movements 
    // performed while dragging an element from the source to the target.
    //Remember: More steps generally make the drag movement more gradual.
    await source.dragTo(target, { steps: 10 });
    await expect(target).toHaveText("Dropped!");
    await page.close()
})

test("Darg and Drop2", async ({ page }) => {
    await page.goto("https://demoqa.com/droppable");

    const source = page.locator("#draggable");

    await expect(source).toBeVisible();

    const target = page.locator("#droppable").first();

    await expect(target).toBeVisible();

    await expect(source).toHaveClass(/ui-draggable/);

    await expect(target).toHaveClass(/ui-droppable/);

    await source.hover();

    await page.mouse.down();

    await target.hover()

    await page.mouse.up();

    await expect(target).toHaveText("Dropped!");

    await page.close()


})

test("Drag and Drop", async ({ page }) => {
    await page.goto("https://demoqa.com/droppable");

    const source = page.locator("#draggable");

    await expect(source).toBeVisible();

    const target = page.locator("#droppable").first();

    await expect(target).toBeVisible();

    await expect(source).toHaveClass(/ui-draggable/)

    await expect(target).toHaveClass(/ui-droppable/);

    const handleBox = await source.boundingBox();

    const targetBox = await target.boundingBox();

    if (!handleBox || !targetBox) {
        throw new Error("Drag handle or drop zone not found")
    }

    await page.mouse.move(handleBox?.x + handleBox?.width / 2, handleBox?.y + handleBox?.height / 2);

    await page.mouse.down();

    await page.mouse.move(targetBox?.x + targetBox?.width / 2, targetBox?.y + targetBox?.height / 2);

    await page.mouse.up()

    await expect(target).toHaveText("Dropped!");

    await page.close()
})


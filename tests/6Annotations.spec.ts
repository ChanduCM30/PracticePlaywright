import { test, expect } from '@playwright/test';

test.describe('Annotations', async () => {


    test('should be able to add an annotation', async ({ page }) => {
        console.log('Starting test1: should be able to add an annotation');
        console.log("End of test1: should be able to add an annotation");
    });

    test('should be able to edit an annotation', async ({ page }) => {
        console.log('Starting test2: should be able to add an annotation');
        console.log("End of test2: should be able to add an annotation");
    });

    test('should be able to delete an annotation', async ({ page }) => {
        console.log('Starting test3: should be able to add an annotation');
        console.log("End of test3: should be able to add an annotation");
    });

});

test("should be able to add an annotation", async ({ page }) => {
    console.log('Starting test4: should be able to add an annotation');
    console.log("End of test4: should be able to add an annotation");
});

test("should be able to edit an annotation", async ({ page }) => {
    console.log('Starting test5: should be able to add an annotation');
    console.log("End of test5: should be able to add an annotation");
});

test("should be able to delete an annotation", async ({ page }) => {
    console.log('Starting test6: should be able to add an annotation');
    console.log("End of test6: should be able to add an annotation");
});
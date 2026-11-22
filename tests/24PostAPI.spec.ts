import { test, expect } from "@playwright/test";

test("Post request1 ", async ({ request }) => {

    const start = Date.now();
    const response = await request.post("/booking", {
        data: {
            "firstname": "Ivy",
            "lastname": "Taylor",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2026-01-01",
                "checkout": "2026-12-31"
            },
            "additionalneeds": "Lunch"
        }
    })

    const end = Date.now();

    const elapsedTime = end - start;

    console.log("Time ", elapsedTime)

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    expect(response.statusText()).toBe("OK");

    expect(elapsedTime).toBeLessThan(3500);

    const resBody = await response.json();

    //Validating the booking id

    expect(resBody.bookingid).toBeDefined();

    expect(typeof resBody.bookingid).toBe('number');

    expect(resBody.bookingid).toBeGreaterThan(0)

    console.log(resBody);

    expect(resBody.booking).toMatchObject({
        "firstname": "Ivy",
        "lastname": "Taylor",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2026-01-01",
            "checkout": "2026-12-31"
        },
        "additionalneeds": "Lunch"

    })

});



test("Post API UI Validation", async ({ page, request }) => {
    const response = await request.post("https://api.demoblaze.com/addtocart", {
        data: {
            "id": "933df64e-9209-9ba5-a83b-14b43e7061f7",
            "cookie": "Y2hhbmRyYTYyMTc5NTg1Mg==",
            "prod_id": 1,
            "flag": true
        }
    })

    expect(response.status()).toBe(200);

    expect(response.ok()).toBeTruthy();

    await page.goto("https://demoblaze.com/index.html");

    await page.locator("#login2").click();

    await page.locator("#loginusername").fill("chandra62");

    await page.locator("#loginpassword").fill("Tester@1234");

    await page.locator("button[onclick='logIn()']").click();

    await page.locator("#cartur").click();

    await expect(page.getByText("Samsung galaxy s6", { exact: true })).toBeVisible();

    await expect(page.getByText("Samsung galaxy s6", { exact: true })).toHaveText("Samsung galaxy s6");

    await page.waitForTimeout(2000);

    await page.close();
})
import { test, expect, request, APIRequestContext } from "@playwright/test";

let reqContext2: APIRequestContext;
test.beforeEach("Before all test", async () => {
    reqContext2 = await request.newContext({
        baseURL: "https://restful-booker.herokuapp.com",
        extraHTTPHeaders: {
            Accept: "application/json"
        }
    })
})

test("API GET Request Practice1", async ({ request }) => {
    const response = await request.get("https://restful-booker.herokuapp.com/booking", {
        headers: {
            Accept: "application/json"
        }
    });

    console.log(await response.json());

    console.log(response.status())

    expect(response.status()).toBe(200)


})

test("API GET Request Practice2", async () => {

    const reqContext = await request.newContext({
        baseURL: "https://restful-booker.herokuapp.com",
        extraHTTPHeaders: {
            Accept: "application/json"
        }
    })
    const response = await reqContext.get("/booking");

    console.log(await response.json());

    console.log(response.status())

    expect(response.status()).toBe(200)


})

test("API GET Request Practice3", async ({ }) => {
    const response = await reqContext2.get("/booking");

    console.log(await response.json());

    console.log(response.status())

    expect(response.status()).toBe(200)


})

test("API GET Request Practice4", async ({ request }) => {
    const response = await request.get("/booking");

    console.log(await response.json());

    console.log(response.status())

    expect(response.status()).toBe(200)
})


test("API GET Request Specific Booking ID", async ({ request }) => {
    const listResponse = await request.get("/booking", {
        headers: {
            Accept: "application/json"
        }
    });
    expect(listResponse.status()).toBe(200);

    const bookings: { bookingid: number }[] = await listResponse.json();
    const bookingId = bookings[0]?.bookingid;
    expect(bookingId).toBeDefined();

    const response = await request.get(`/booking/${bookingId}`);
    expect(response.status()).toBe(200);

    const booking = await response.json();
    console.log({ bookingId, booking });
})


test("Get booking Ids by first name and last name", async ({ request }) => {

    const listResponse = await request.get("/booking?firstname=John&lastname=Smith");

    expect(listResponse.status()).toBe(200);

    console.log(await listResponse.json());
})

test("Get booking Ids by first name and last name using params", async ({ request }) => {

    const listResponse = await request.get("/booking", {
        params: {
            firstname: "John",
            lastname: "Smith"
        }
    });

    expect(listResponse.status()).toBe(200);

    console.log(await listResponse.json());
})


test("API GET Request Specific Booking ID Assertions", async ({ request }) => {
    const listResponse = await request.get("/booking", {
        headers: {
            Accept: "application/json"
        }
    });
    expect(listResponse.status()).toBe(200);

    expect(listResponse.ok()).toBeTruthy();

    expect(listResponse.statusText()).toBe("OK")

    const bookingIds: { bookingid: number }[] = await listResponse.json();

    const bookingID = bookingIds[0]?.bookingid;
    console.log(bookingID)

    expect(bookingID).toBeDefined();

    const response = await request.get(`/booking/${bookingID}`);
    expect(response.status()).toBe(200);

    expect(response.ok()).toBeTruthy();

    const booking = await response.json();

    console.log({ bookingID, booking });

    expect(booking.firstname).toEqual("Sally")

    // expect(booking).toMatchObject({
    //     bookingID: 3,
    //     booking: {
    //         firstname: 'Sally',
    //         lastname: 'Brown',
    //         totalprice: 406,
    //         depositpaid: false,
    //         bookingdates: { checkin: '2026-08-10', checkout: '2026-09-14' }
    //     }
    // })


})

test("API with UI Verification", async ({ request, page }) => {
    const response = await request.get("https://api.demoblaze.com/entries");

    const responseBody = await response.json();

    console.log("Backend Title: ", responseBody.Items[0].title)

    await page.goto("https://demoblaze.com/");

    const UITitle: string | null = await page.locator("#tbodyid > div:nth-child(1) > div > div a").textContent();

    if (!UITitle) {
        throw new Error("No title present")
    }

    console.log("UI Title: ", UITitle)

    expect(UITitle).toEqual(responseBody.Items[0].title)

    await page.close()



})
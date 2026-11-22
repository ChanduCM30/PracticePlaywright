import { test, expect } from "@playwright/test";




test("API GET Request validate headers", async ({ request }) => {
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


    const headers = response.headers();

    console.log(headers);

    //Validate Content-Type

    expect(headers['content-type']).toContain("application/json; charset=utf-8");
    expect(headers['server']).toContain("Heroku");
    expect(headers['date']).toBeDefined();
    expect(headers['etag']).toBeDefined();
    expect(headers['nel']).toBeDefined();

    //4. Validate a specific header using toHaveProperty()

    expect(headers).toHaveProperty('content-type');
    expect(headers).toHaveProperty('server');

    const arr = response.headersArray();
    console.log(arr)
    console.log(arr.length);

    arr.forEach((header) => {
        console.log(header.name,"  ---- >      ", header.value)
    })



})

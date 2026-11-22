import { test, expect } from "@playwright/test";


test("PATCH request validate", async ({ request }) => {
    const listResponse = await request.get("https://restful-booker.herokuapp.com/booking");

    expect(listResponse.status()).toBe(200);

    const responseBody: { bookingid: number }[] = await listResponse.json();

    const firstBookingID = responseBody[0]?.bookingid;

    expect(firstBookingID).toBeDefined();

    console.log("Booking ID ", firstBookingID);


    //Details of booking for specific id

    const res = await request.get(`https://restful-booker.herokuapp.com/booking/${firstBookingID}`);


    console.log("booking details before update :  ", await res.json());


    const updateResponse = await request.patch(`https://restful-booker.herokuapp.com/booking/${firstBookingID}`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Basic YWRtaW46cGFzc3dvcmQxMjM="
        },
        data: {
            "firstname": "Carg island",
            "lastname": "Mountain",
        }
    })

    expect(updateResponse.status()).toBe(200);

    console.log("After update booking details : ", await updateResponse.json())
})
import { test, expect } from "@playwright/test";

let TokenValue: string = ""

test("PUT call API verify", async ({ request }) => {


    const listResponse = await request.get("https://restful-booker.herokuapp.com/booking");

    expect(listResponse.status()).toBe(200);

    const responseBody: { bookingid: number }[] = await listResponse.json();

    const firstBookingID = responseBody[0]?.bookingid;

    expect(firstBookingID).toBeDefined();

    console.log("Booking ID ", firstBookingID);


    //Generate the token

    const tokenRes = await request.post("/auth", {
        data: {
            "username": "admin",
            "password": "password123"
        }
    })

    console.log("Token : ", await tokenRes.json())

    TokenValue = (await tokenRes.json()).token;

    console.log("Token Value : ", TokenValue)


    //Details of booking for specific id

    const res = await request.get(`https://restful-booker.herokuapp.com/booking/${firstBookingID}`);


    console.log("booking details before update :  ", await res.json());



    const updateResponse = await request.put(`https://restful-booker.herokuapp.com/booking/${firstBookingID}`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cookie": "token=" + TokenValue
            //"Authorization": "Basic YWRtaW46cGFzc3dvcmQxMjM="
        },
        data: {
            "firstname": "Michael",
            "lastname": "Tony",
            "totalprice": 116,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2024-01-01",
                "checkout": "2026-01-01"
            },
            "additionalneeds": "Breakfast"
        }
    })

    expect(updateResponse.status()).toBe(200);

    console.log("After update booking details : ", await updateResponse.json())



})
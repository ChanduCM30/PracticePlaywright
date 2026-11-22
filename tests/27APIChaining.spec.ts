import { test, expect } from "@playwright/test";

import payload from "../testData/apiData.json"

test("API chaining included Passing the Body", async ({ request }) => {
    //Create Booking

    const response = await request.post("/booking", {
        data: payload.payload1
    })

    const responseBody = await response.json();

    expect(response.status()).toBe(200);

    expect(response.ok()).toBeTruthy();

    console.log("Booking details after create : ", responseBody);

    //Validating Booking

    expect(typeof responseBody.bookingid).toBe('number');

    expect(responseBody.booking).toMatchObject(payload.payload1);

    const bookingID: number = responseBody.bookingid;

    console.log("Booking ID created : ", bookingID);



    //Get the details of Booking ID created

    const res = await request.get(`/booking/${bookingID}`);

    expect(res.status()).toBe(200);

    expect(res.ok()).toBeTruthy();

    const resBody = await res.json();

    console.log("Booking details after get method ", resBody)

    expect(resBody).toMatchObject(payload.payload1);


    //Update the Booking details using PUT method

    const updateRes = await request.put(`booking/${bookingID}`, {
        headers: {
            "Authorization": "Basic YWRtaW46cGFzc3dvcmQxMjM="
        },
        data: payload.payload2
    });

    expect(updateRes.status()).toBe(200);

    const updateResBody = await updateRes.json();

    console.log("Booking details after update : ", updateResBody);

    //Delete the Booking details

    const DelRes = await request.delete(`/booking/${bookingID}`, {
        headers: {
            "Authorization": "Basic YWRtaW46cGFzc3dvcmQxMjM="
        }
    });

    expect(DelRes.status()).toBe(201);
    expect(DelRes.statusText()).toBe("Created");
    console.log("Status message after delete : ", DelRes.statusText());



    //Get the details of Booking ID created

    const res2 = await request.get(`/booking/${bookingID}`);

    console.log(res2.statusText(), res2.status())

    expect(res2.status()).toBe(404);


})
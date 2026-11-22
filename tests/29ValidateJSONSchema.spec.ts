import { test, expect } from "@playwright/test";
import Ajv from "ajv"




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

    //Ajv :  Another JSON Schema Validator.

    /*
    It is a JavaScript library used to validate JSON data against a JSON Schema.
    
    Playwright itself does not provide built-in JSON Schema validation, so we install AJV.

    npm install ajv

    What does response.json() do?

     It reads the response body and parses the JSON into a JavaScript object.
    */
    const bookingSchema = {
        type: 'object',
        properties: {
            firstname: { type: 'string' },
            lastname: { type: 'string' },
            totalprice: { type: 'number' },
            depositpaid: { type: 'boolean' },
            bookingdates: {
                type: 'object',
                properties: {
                    checkin: { type: 'string' },
                    checkout: { type: 'string' }
                },
                required: ['checkin', 'checkout'],
                additionalProperties: false
            },
            additionalneeds: { type: 'string' }
        },
        required: [
            'firstname',
            'lastname',
            'totalprice',
            'depositpaid',
            'bookingdates',
            'additionalneeds'
        ],
        additionalProperties: false
    };

    //Initialize AJV
    const ajv = new Ajv();


    //Compile Schema
    const validate = ajv.compile(bookingSchema);

    //Validate response against schema
    const isValidate = validate(booking)

    //Assertion

    expect(isValidate, JSON.stringify(validate.errors, null, 2)).toBeTruthy();

})

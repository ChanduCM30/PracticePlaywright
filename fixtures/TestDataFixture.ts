import { test as baseTest } from "@playwright/test";


type LoginData = {
    username: string;
    password: string;
};

type CandidateData = {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phone: string;
};

type DataFixture = {
    loginData: LoginData;
    testData: CandidateData;
}

export const test = baseTest.extend<DataFixture>({

    loginData: {
        username: "Admin",
        password: "admin123"
    },

    testData: {
        "firstName": "Akhil",
        "middleName": "Saho",
        "lastName": "R",
        "email": "Akhil2343@gmail.com",
        "phone": "8567437000"
    }

})

export {expect} from "@playwright/test"
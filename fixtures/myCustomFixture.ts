import { test as baseTest } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { CartPage } from "../pages/cartPage";
import { OrderPage } from "../pages/orderPage";


type myFixtures = {
    loginPage: LoginPage;
    cartPage: CartPage;
    orderPage: OrderPage;
}

type myWorkerFixture = {
    workerFixture: any
}


export const test = baseTest.extend<myFixtures, myWorkerFixture>({

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page))
    },
    orderPage: async ({ page }, use) => {
        await use(new OrderPage(page))
    },

    workerFixture: [async ({ }, use: (workerFixture: any) => Promise<void>) => {
        const workerfixture = 'I am worker fixture';
        console.log("Before part of worker fixture");
        await use(workerfixture);
        console.log("After part of worker fixture");
    }, { scope: 'worker' }]
})

export { expect } from "@playwright/test"
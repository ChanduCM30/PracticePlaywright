"use strict";
/*
3. Types and Interfaces

1. What are Types in TypeScript?

Definition:

Types in TypeScript define what kind of values a variable, function parameter, object property, or function return value can hold.

TypeScript is a statically typed language. It checks types during development and compilation rather than waiting for the code to execute.

For example:
let employeeName: string = "Chandrashekar";
let employeeId: number = 101;
let isActive: boolean = true;

Why do we use types?
Helps identify errors during development.
Improves code readability.
Provides better IntelliSense and autocomplete.
Makes code easier to maintain.
Helps build reliable automation frameworks.

*/
Object.defineProperty(exports, "__esModule", { value: true });
//Now we can create an object that adheres to the Employee interface:
let emp1 = {
    id: 101,
    name: "Chandrashekar",
    department: "Testing",
    isActive: true
};
const user = {
    username: "Chandra",
    password: "Tester@1234",
    login() {
        return this.username === "Chandra" && this.password === "Tester@1234";
    }
};
console.log(user.login());

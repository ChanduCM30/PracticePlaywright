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

/*
2. Interface vs Type (Very Important Interview Question)

This is one of the most frequently asked TypeScript interview questions.

Both interface and type are used to define the structure of data.

However, they have some differences.

A. Interface

Definition:

An interface defines the structure or contract that an object or class should follow.

It specifies which properties and methods an object must contain.

Example:
*/

interface Employee {
    id: number;
    name: string;
    department: string;
    isActive: boolean
}

//Now we can create an object that adheres to the Employee interface:

let emp1: Employee = {
    id: 101,
    name: "Chandrashekar",
    department: "Testing",
    isActive: true
}

//If we miss a required property, TypeScript displays an error

// Interface with methods

// Interfaces can also define method signatures.

interface Login {
    username: string,
    password: string,
    login(): boolean
}

const user: Login = {
    username: "Chandra",
    password: "Tester@1234",

    login(): boolean {
        return this.username === "Chandra" && this.password === "Tester@1234";
    }
}

console.log(user.login())


//Interface inheritance

// An interface can extend another interface using extends.

interface Person {
    id: number;
    name: string;
}

interface Developer extends Person {
    programmingLanguage: string;
}

let developer1: Developer = {
    id: 201,
    name: "Chandra",
    programmingLanguage: "TypeScript"
}


/*
B. Type

Definition:

The type keyword creates a type alias. It allows us to give a name to a type, which can represent primitive values,
objects, unions, tuples, functions and more.

Example:
*/

type EmployeeType = {
    id: number;
    name: string;
    department: string;
    isActive: boolean
}

let employee1: EmployeeType = {
    id: 102,
    name: "Chandrashekar",
    department: "Development",
    isActive: true
}

//Here, we created a custom type called Employee.

// Type with union

// One important advantage of type is that it supports union types.

type Status = 'Pending' | 'Success' | 'Failed';

let testStatus: Status = 'Success';

//The variable can only accepts 3 values: 'Pending', 'Success', or 'Failed'. 
// If we try to assign any other value, TypeScript will throw an error.
// let testStatus: Status = 'Completed'; Beacause 'Completed' is not part of the defined union type,
//  TypeScript will throw an error during compilation.


/*
Type with intersection

We can combine multiple types using the & operator.
*/
type Employee1 = {
    id: number;
    name: string;
};

type Department = {
    department: string;
};

type EmployeeDetails = Employee1 & Department;

//Implementation
const employee: EmployeeDetails = {
    id: 101,
    name: 'Chandrashekar',
    department: 'Automation'
};


//Interfaces with the same name can be combined.

interface Employee {
    id: number;
    name: string;
}

interface Employee {
    department: string;
    isActive: boolean;
}

//The above two interfaces will be merged into a single interface with all the properties.

const employee2: Employee = {
    id: 102,
    name: 'Chandra',
    department: 'QA',
    isActive: true
};

/*
Real-time Playwright usage

In a Playwright framework, I would generally use:

interface for API request and response structures.
interface for page or configuration object contracts.
type for union types, status values and combinations of types.
Interview Question: What is the difference between interface and type?

Interview answer:

"Both interface and type are used to define data structures in TypeScript. However,
interfaces are primarily used to define object contracts and support declaration merging and extension through the extends keyword.

Types are more flexible because they support primitive aliases, union types, intersection types and tuples.

In my Playwright framework, I prefer interfaces for API request and response structures and types for union types
and other complex type combinations."
*/


/*
3. Union Types

Definition:

A union type allows a variable to accept more than one data type.

We use the pipe (|) operator.

Example:
*/

let employeeId: number | string;
employeeId = 101; //Valid
employeeId = "EMP101"; //Valid

// employeeId=true; //Invalid, TypeScript will throw an error because boolean is not part of the union type.



//Real-time Playwright example

// Suppose an automation framework supports multiple environments.

type Environment = 'QA' | 'UAT' | 'PROD';

let environment: Environment = 'QA';

//Now we can restrict the environment variable to only accept one of the three predefined values: 'QA', 'UAT', or 'PROD'.

/*
Union types with API responses

Sometimes an API returns different response structures.

For example:
*/
type ApiResponse =
    | { status: 'success'; data: any }
    | { status: 'error'; message: string };

function handleApiResponse(response: ApiResponse) {
    if (response.status === 'success') {
        console.log('Data:', response.data);
    } else {
        console.error('Error:', response.message);
    }
}
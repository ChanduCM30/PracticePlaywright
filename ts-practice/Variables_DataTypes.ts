/**
2. Variables and Data Types in TypeScript

1. What is a variable?

A variable is a named container used to store data in a program.

TypeScript has three keywords for declaring variables: var, let, and const.

Part A: Declaring variables

Syntax:
let variableName: dataType = value;

const

The value cannot be reassigned. Use this by default.
const is used to declare variables whose references cannot be reassigned after initialization.

Characteristics:

Block-scoped.
Cannot be reassigned.
Cannot be redeclared in the same scope.
Must be initialized during declaration.

const prevents reassignment, not modification of the contents.

Example:
const browsers: string[] = ["chrome", "firefox"];

browsers.push("edge");

console.log(browsers);
//output: ["chrome", "firefox", "edge"]
This is allowed because we are modifying the existing array, not assigning a new array.
 */
const baseUrl: string = "https://example.com";
// baseUrl = "https://other.com";  // Error: Cannot assign to 'baseUrl' because it is a constant

//Important: const stops reassignment, not modification of objects or arrays.
const browsers: string[] = ["chrome", "firefox"];
browsers.push("edge");        // Allowed, the array is modified
// browsers = ["safari"];     // Error, reassignment
//********************************************************************************************** */

// let
/*
Theory:

let was introduced in ES6 (ECMAScript 2015).

It allows us to declare variables whose values can change during program execution.

Characteristics:

Block-scoped.
Can be reassigned.
Cannot be redeclared in the same scope.
Hoisted but cannot be accessed before declaration because of the Temporal Dead Zone.

Ex:
let age = 25;

age = 30;

console.log(age);

Understanding the block scoped
if (true) {
    let x = 10;
}

console.log(x); // Error
*/
// The value can be reassigned. Use it when the value will change.

let retryCount: number = 0;
retryCount = 1;
retryCount++;


// **************************************************************************************************************
/*
var

// var is the older JavaScript keyword used to declare variables.
/*
Its main characteristics are:

Function-scoped: A variable declared inside a function is accessible throughout that function.
Can be reassigned.
Can be redeclared in the same scope.
It is hoisted and initialized with undefined.

Ex:
var username = "Chandra";

username = "Ravi";

var username = "Anil";

console.log(username); // Anil

Understanding function scope:

function test() {
    if (true) {
        var x = 10;
    }

    console.log(x);
}

The old JavaScript way. Avoid it. It has two problems:

Function scope instead of block scope, so it leaks out of blocks:
*/
if (true) {
    var x = 10;
    let y = 20;
}
console.log(x); // 10 (leaked)
// console.log(y); // Error: y is not defined

//Hoisting: var is moved to the top and initialized as undefined, which hides bugs:

// console.log(a); // undefined (no error)
var a = 5;


/*
Comparison table
Feature                   var	                let	                const
Scope	                  Function	            Block	            Block
Reassign	              Yes	                Yes	                No
Redeclare in same scope	  Yes	                No	                No
Hoisting behavior	      Initialized as undefined	Temporal Dead Zone (error if used early)	Temporal Dead Zone
Recommended	              No	                Yes	                Yes (default)




Difference between var, let and const
Feature	                     var	            let	                    const
Scope	                     Function	        Block	                Block
Reassignment	             Yes	            Yes	                    No
Redeclaration	             Yes	            No	                    No
Initialization required	     No	                No	                    Yes
Hoisting	Initialized as   undefined	        TDZ	                    TDZ

Interview question: Which one do you prefer?

Answer:

"I prefer const by default because it prevents accidental reassignment. When I need to change a variable's value, I use let.
I avoid var because of its function-scoping behaviour and potential hoisting-related issues."

*/


//**************************************************************************************** */

/*
Part B: Type annotations vs. type inference
Type annotation (you write the type)

What is Type Annotation?
Type annotation means explicitly specifying the data type of a variable.

We tell TypeScript what kind of value the variable should store.

Syntax:
let variableName: dataType = value;
*/

let username: string = 'chandra';


//Type inference (TypeScript figures it out)
/*
Type inference is a feature in TypeScript where the compiler automatically identifies the data type based on the assigned value.

We don't need to explicitly specify the type
*/
let username1 = "Chandra";   // inferred as string
// username1 = 100;          // Error: Type 'number' is not assignable to type 'string'


// Part C: Primitive types: Primitive data types represent the basic values used in programming.
// 1. string
/*
A string is used to store textual information such as names, messages, addresses and descriptions.

We can declare strings using:

Single quotes ' '
Double quotes " "
Backticks ` `
*/
let testName: string = "Login Test";
let env: string = 'QA';
let msg: string = `Running ${testName} on ${env}`;   // template literal
/*
What is a template literal?

A template literal allows us to embed variables and expressions directly inside a string.

It uses backticks and ${}.

Example:
let name = "Chandra";
let age = 30;

console.log(`My name is ${name} and my age is ${age}`);
My name is Chandra and my age is 30
*/

// 2. number
/*
Theory:

The number data type stores numerical values.

TypeScript does not have separate int and float types.

The number type supports:

Integers
Decimal values
Hexadecimal values
Binary values
Octal values

let age: number = 30;

let price: number = 99.99;

let hex: number = 0xff;

let timeout: number = 30000;
*/

// Covers integers, decimals, hex, and more. There is no separate int or float.

let count: number = 10;
let price: number = 99.99;
let hex: number = 0xff;
let timeout: number = 30_000;   // underscores for readability

//3. boolean
/*
Boolean is a data type that represents only two values:

true
false

Playwright Application:

const isLoginSuccessful: boolean = true;

if (isLoginSuccessful) {
    console.log("Login Passed");
} else {
    console.log("Login Failed");
}

It is commonly used in conditional statements and decision-making.
*/
let isLoggedIn: boolean = true;
let hasFailed: boolean = false;

// 4. null and undefined
// undefined: a variable declared but not assigned
//Undefined means a variable has been declared but has not been assigned a value.


let username2: string | undefined;

console.log(username2);   // undefined

let a1: undefined = undefined;

// null: an intentional “no value”
//Null represents an intentional absence of a value.
let b1: null = null;

let element: string | null = null;   // union type, covered in detail later
console.log(element);   // null

/*
Difference
            Undefined                    	                          Null
        Value not assigned	                                    Intentionally empty
        Usually occurs by default	                            Usually assigned explicitly
        Represents missing initialization	                     Represents no value

Important: With strictNullChecks enabled, TypeScript requires you to explicitly allow null or undefined in the type when appropriate.

*/


// 5. bigint and symbol
//BigInt is used to represent integers larger than the maximum safe integer supported by JavaScript's number type.
// Rarely used in testing. Just know they exist.

let big: bigint = 9007199254740993n;
//The n suffix identifies a BigInt literal.

/*
6. Symbol

Theory:

Symbol is a primitive data type used to create unique identifiers.

Even if two symbols contain the same description, they are different values.

Example:let id1 = Symbol("id");

let id2 = Symbol("id");

console.log(id1 === id2); // false
Symbols are useful when unique property keys are required.
*/

// Part D: Special types
// any (avoid)

// Turns off type checking completely.

/*
any disables TypeScript's type checking for a particular variable.

It allows us to assign values of any data type without producing compilation errors.

let data: any = "Hello";

data = 100;

data = true;

data = ["A", "B"];
*/

let data: any = "hello";
data = 42;
data = true;
data.toUpperCase();   // No compile error, crashes at runtime if data is a number


// unknown (safe alternative to any)

// Accepts any value, but you must check the type before using it.
/*
unknown is similar to any because it can store values of any data type.

However, unlike any, we must check the type before performing operations.
*/

// unknown (safe alternative to any)

// Accepts any value, but you must check the type before using it.

let response: unknown = "Success";

// response.toUpperCase();   // Error: 'response' is of type 'unknown'

if (typeof response === "string") {
    console.log(response.toUpperCase());   // OK after the check
}
//Use unknown for things like API responses and parsed JSON.
/*
Playwright application:

When handling API responses or parsed JSON whose structure is not yet known, unknown is safer than any.
*/

//void

// Used for functions that return nothing.

function logMessage(msg: string): void {
    console.log(msg);
}


// never
/*
heory:

never represents a value that never occurs.

It is commonly used for:

Functions that always throw errors.
Functions that never finish execution.
Exhaustive type checking.
*/

// Represents values that never occur: a function that always throws or loops forever.
//This function never completes normally because it always throws an error.
function fail(message: string): never {
    throw new Error(message);
}


/*

any vs. unknown vs. never
Type	                        Meaning	                               Safe?
any	                            Anything, no checks	                    No
unknown	                    Anything, but must be checked before use	Yes
never	                    No value is possible	                    Yes

*/


//Part E: Arrays

/*
What is an Array?

Theory:

An array is a collection of multiple values stored in a single variable.

Arrays are used when we need to store and manage multiple values of the same or compatible types.

In TypeScript, we can declare arrays using two syntaxes.

let ids: number[] = [101, 102, 103];

let names: string[] = ["Ravi", "Anil", "Kiran"];

2. Generic array syntax

let ids: Array<number> = [101, 102, 103];

let names: Array<string> = ["Ravi", "Anil"];

Common Array Methods

Consider:
const browsers: string[] = ["chrome", "firefox"];

push():

Adds an element to the end of the array.

browsers.push("edge");

console.log(browsers); //["chrome", "firefox", "edge"]

pop():

Removes the last element.

browsers.pop();

console.log(browsers);//["chrome", "firefox"]

includes():

Checks whether an element exists in the array

console.log(browsers.includes("chrome")); // true


Accessing array elements:

console.log(browsers[0]);

Mixed Type Array

We can store different data types using union types.
let mixed: (string | number)[] = ["A", 100, "B", 200];
*/

// Two equivalent syntaxes:

let ids: number[] = [1, 2, 3];
let names: Array<string> = ["Ravi", "Anil"];

//Common Questions
const browsers1: string[] = ["chrome", "firefox"];

browsers1.push("edge");           // add to end
browsers1.pop();                  // remove from end
console.log(browsers1.length);    // size
console.log(browsers1[0]);        // first element
console.log(browsers1.includes("chrome"));   // true


//Mixed type array using a union:
let mixed: (string | number)[] = ["a", 1, "b", 2];

// Part F: Tuples

/*
A tuple is a special type of array where each position has a predefined data type.

Unlike normal arrays, tuples define the expected type of each element based on its position.
*/

// A fixed-length array where each position has a specific type.

let testResult: [string, number, boolean] = ["Login Test", 3, true];

/*
Here:

Index 0 → string
Index 1 → number
Index 2 → boolean

Interview question: Difference between array and tuple?

An array generally stores multiple values of the same type or compatible types, whereas a tuple defines a fixed sequence of positions with specific types.

Note: Tuples are not automatically immutable or strictly fixed-length at runtime. TypeScript provides compile-time positional checking.
*/

console.log(testResult[0]);   // "Login Test"
console.log(testResult[1]);   // 3

// testResult = [3, "Login Test", true];   // Error: wrong order of types


//Part I: Union and literal types
// Union (|): one of several types

/*
What is a Union Type?

Theory:

A union type allows a variable to store values belonging to one of multiple specified types.

We use the pipe symbol (|) to define a union.

Real-time example

Suppose an application allows users to log in using either an email address or a mobile number.

function login(user: string | number) {
    console.log(user);
}

login("chandra@gmail.com");

login(9876543210);


*/

let id: string | number;
id = 101;
id = "A101";
// id = true;   // Error


//Literal types: only specific values allowed

/*
What is a Literal Type?

Theory:

A literal type restricts a variable to a specific value or a predefined set of values.

Instead of allowing any string, we can restrict the variable to particular strings.

let browser: "chromium" | "firefox" | "webkit";

browser = "chromium";

browser = "firefox";

// browser = "safari"; // Error


Real-time Playwright example

type Browser = "chromium" | "firefox" | "webkit";

function launchBrowser(browser: Browser) {
    console.log(`Launching ${browser}`);
}

launchBrowser("chromium");
*/

let browser: "chromium" | "firefox" | "webkit";
browser = "firefox";
// browser = "safari";   // Error

//This is very common in test frameworks to restrict inputs.


// Part J: Type aliases

/*
What is a Type Alias?

Theory:

A type alias allows us to create a custom name for an existing type.

We use the type keyword.

It improves code readability and allows us to reuse type definitions.

Syntax:
type TypeName = existingType;

Example:
type Browser = "chromium" | "firefox" | "webkit";

let browser: Browser = "chromium";

Another example:
type ID = string | number;

let userId: ID = 1001;

userId = "A1001";

Why do we use Type Aliases?

Imagine you need to use the same union type in 10 different places.

Instead of writing:

let userId: string | number;

let employeeId: string | number;

let customerId: string | number;

You can reuse the type alias:

type ID = string | number;

let userId: ID;

let employeeId: ID;

let customerId: ID;
*/

// Give a custom name to a type:

/*
This is called a String Literal Union Type in TypeScript.

It allows a variable to accept only a predefined set of string values.

Here:

type → Creates a custom type.
Browser → Type name.
| → Union operator (OR).
"chromium", "firefox", "webkit" → Allowed values.


type Browser = "chromium" | "firefox" | "webkit";

let browser: Browser;

browser = "chromium"; // Valid
browser = "firefox";  // Valid
browser = "webkit";   // Valid

browser = "safari";   // Error
*/

type Browser = "chromium" | "firefox" | "webkit";
type ID = string | number;

let browser2: Browser = "chromium";
let id2: ID = 1001;
id2 = "A1001";


//Part K: Type assertion

// Tell TypeScript “I know the type better than you.”

/*
What is Type Assertion?

Theory:

Type assertion tells the TypeScript compiler to treat a value as a particular type.

It is useful when we know more about a value's type than TypeScript can determine.

We commonly use two syntaxes:

as syntax
Angle-bracket syntax

1. Using as syntax:
let value: unknown = "Hello World";
let length: number = (value as string).length;

2. Using angle-bracket syntax:

let value: unknown = "Hello World";
let length: number = (<string>value).length;
*/

let value: unknown = "Hello World";
let length: number = (value as string).length;


//Part L: null and undefined handling

// Common in locators and API data

let title: string | undefined;

// Optional chaining (?.): stops safely if value is null/undefined
//It prevents errors when accessing properties of null or undefined.
console.log(title?.length);         //output:  undefined, no crash

// Nullish coalescing (??): default only for null/undefined
//It provides a default value only when the left-hand side is null or undefined.
let timeout1 = undefined;
let finalTimeout = timeout1 ?? 5000;   // 5000

let timeout2 = 0;

let finalTimeout2 = timeout ?? 5000;

console.log(finalTimeout);  // 0

// Why? Because 0 is not null or undefined.

// Remember: ?? checks only for null and undefined, not other falsy value



// Non-null assertion (!): "trust me, it's not null"
//"I am sure this value is not null or undefined. Allow me to access it."
let el: string | null = "button";
console.log(el!.length); //6

/*

?? vs ||:

let retries = 0;
console.log(retries || 3);   // 3 (treats 0 as falsy)
console.log(retries ?? 3);   // 0 (only null/undefined trigger the default)



//1. Nullish Coalescing (??)

It returns the right-hand value ONLY when the left-hand value is:

null
undefined

*/
let a2 = 0;
let b2 = "";

console.log(a2 ?? 100);  // 0
console.log(b2 ?? "Default"); // ""


/*
2. Logical OR (||)

It returns the right-hand value when the left-hand value is falsy.

Falsy values include:

0
false
"" (empty string)
null
undefined
NaN

let a = 0;
let b = "";

console.log(a || 100);       // 100
console.log(b || "Default"); // Default
*/

//An enum (Enumeration) is used to define a collection of named constants. It helps us represent a fixed set of values.

enum Priority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high"
}

console.log(Priority.LOW);
console.log(Priority.MEDIUM);
console.log(Priority.HIGH);

/*
Here:

Priority → Enum name.
LOW, MEDIUM, HIGH → Enum members.
"low", "medium", "high" → Assigned string values.
*/
// 2. Using Enum in a variable

enum Priority2 {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high"
}

let taskPriority: Priority2 = Priority2.HIGH;

console.log(taskPriority);
/*

Interview questions

1. Difference between let, const, and var?
var is function-scoped and hoisted as undefined. let and const are block-scoped. const cannot be reassigned. Use const by default, let when reassignment is needed, and avoid var.

2. Can you modify a const array?
Yes. const prevents reassignment of the variable, not mutation of its contents.

3. any vs. unknown?
any disables type checking. unknown accepts any value but requires a type check before use, so it is safer.

4. What is type inference?
TypeScript automatically deduces a variable’s type from its assigned value.

5. What is a tuple?
A fixed-length array where each position has a defined type.

6. What is the difference between ?? and ||?
?? falls back only for null or undefined. || falls back for any falsy value, including 0, "", and false.

7. What is a union type? Give a use case.
A variable that can hold one of several types, e.g. string | number for an ID.

8. What is the difference between null and undefined?
undefined means a variable has not been assigned. null is an explicit “no value”.

9. What is an enum? Where would you use it in automation?
A named set of constants, used for environments, browsers, roles, or priorities.

10. What does void mean?
A function that returns no value.





Part O: Interview Questions and Answers

These are the questions I recommend preparing from this chapter.

Q1. What is TypeScript?

TypeScript is a strongly typed programming language built on JavaScript. It adds static type checking and compiles into JavaScript, which can run in browsers or Node.js.

Q2. What is the difference between var, let and const?

var is function-scoped, whereas let and const are block-scoped. let allows reassignment, while const does not.

Q3. What is type inference?

Type inference is the ability of TypeScript to automatically identify a variable's data type based on its assigned value.

Q4. What is the difference between any and unknown?

any disables type checking. unknown requires type checking before performing operations.

Q5. What is never?

never represents values that never occur. It is commonly used in functions that always throw errors or never finish execution.

Q6. What is void?

Void is used as a function return type when the function does not return a meaningful value.

Q7. What is a tuple?

A tuple is an array-like structure where each position has a predefined data type.

Q8. What is a union type?

A union type allows a variable to accept one of multiple specified types.

Q9. What is a type alias?

A type alias creates a custom name for an existing type or type definition.

Q10. What is type assertion?

Type assertion tells the TypeScript compiler to treat a value as a specific type without performing runtime type conversion.

Q11. What is optional chaining?

Optional chaining safely accesses properties or methods when a value might be null or undefined.

Q12. What is nullish coalescing?

It provides a default value only when the left-hand side is null or undefined.

Q13. What is the difference between ?? and ||?

?? checks only null and undefined, whereas || checks all falsy values.

Q14. What is an enum?

An enum defines a collection of named constants representing a fixed set of related values.

Q15. What is the difference between null and undefined?

Undefined generally indicates that a value has not been assigned, whereas null represents an intentional absence of a value.


*/
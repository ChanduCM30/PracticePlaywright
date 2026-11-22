/*

Introduction to Typescript:

What is TypeScript?

TypeScript is a superset of JavaScript created by Microsoft. It adds static typing on top of JavaScript. Any valid JavaScript is also valid TypeScript.

The browser and Node.js can’t run TypeScript directly. It is compiled (transpiled) into plain JavaScript first.
hello.ts  --(tsc compiler)-->  hello.js  --(Node.js)-->  output

Typescript is a superset of Javascript that adds static typing.

Javascript is loosely typed language, which means that you can assign any type of value to a variable without any restrictions.
This can lead to unexpected behavior and bugs in your code.

Typescript uses compile-time type checking to catch errors before they occur at runtime.
This means that you can catch type-related errors during development, which can save time and reduce the likelihood of bugs in your code.


*/

// JavaScript vs. TypeScript

// JavaScript (error appears only at runtime):

/*
function add(a, b) {
return a + b;
}
console.log(add(5, "10")); // "510" - no warning, wrong result
*/

/*
function add(a: number, b: number): number {
return a + b;
}
console.log(add(5, "10")); // Error: Argument of type 'string' is not assignable to parameter of type 'number'

*/

/*
Why TypeScript matters for testers
Fewer runtime failures: typos and wrong data types are caught in the editor, before the test runs
Autocomplete: Playwright’s APIs show suggestions and documentation as you type
Readable frameworks: typed Page Objects and API response models make a shared codebase easier to understand
Industry standard: Playwright’s default language is TypeScript, and most automation job descriptions ask for it


Key terms
Term	Meaning
Static typing:	Types are checked at compile time, before the code runs
Transpile	Convert TypeScript to JavaScript
tsc	The TypeScript compiler
tsconfig.json	Compiler settings file
Type annotation	Explicitly declaring a type, e.g. let age: number
*/

let testName:string="Login Test";
let retries:number=3;
let isEnabled:boolean=true;
console.log(`${testName} | retries: ${retries} | passed: ${isEnabled}`);

/*
Interview questions
What is TypeScript? A typed superset of JavaScript that compiles to plain JavaScript.
Is TypeScript compiled or interpreted? Compiled (transpiled) to JavaScript, which then runs in Node.js or the browser.
Why use TypeScript over JavaScript in automation? Early error detection, better IntelliSense, and more maintainable frameworks.
Do types exist at runtime? No, they are erased during compilation.
*/
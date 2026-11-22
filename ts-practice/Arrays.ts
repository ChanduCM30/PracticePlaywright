/*

1. What is an Array?

Theory:

An array is a data structure used to store multiple values in a single variable.

Instead of creating separate variables for every value, we can store them together in an array.

For example, imagine you want to store browser names:
*/

let browser1 = "chromium";
let browser2 = "firefox";
let browser3 = "webkit";

//Instead of creating separate variables, we can store them in an array:
let browsers = ["chromium", "firefox", "webkit"];

/*
2. How to create an Array?

Theory:

There are two ways to create an array in TypeScript:

1. Using square brackets []:
   - This is the most common way to create an array.
   - Example: let fruits: string[] = ["apple", "banana", "cherry"];

2. Using the Array constructor:
   - This method is less common but can be useful in certain situations.
   - Example: let numbers: number[] = new Array(1, 2, 3, 4, 5);


   2. Typed Arrays

Theory:

A typed array is an array where we explicitly define the type of elements it can contain.

TypeScript checks the values being added to the array and prevents incompatible data types.

There are two ways to declare typed arrays.

Method 1: Using Type[]
*/

let numbers: number[] = [10, 20, 30, 40];

let names: string[] = ["Chandra", "Ravi", "Anil"];

let status: boolean[] = [true, false, true];

//Method 2: Using Array<T>

// This is called Generic Array Syntax.

let numbers2: Array<number> = [10, 20, 30];

let names2: Array<string> = ["Chandra", "Ravi"];


/******************************************************************************* */

//common array methods

//1. push() - Adds one or more elements to the end of an array and returns the new length of the array.

let fruits: string[] = ["apple", "banana"];
fruits.push("cherry"); // Adds "cherry" to the end of the array
console.log(fruits); // Output: ["apple", "banana", "cherry"]
console.log(fruits.length); // Output: 3

//2. pop() - Removes the last element from an array and returns that element.

let lastFruit = fruits.pop(); // Removes "cherry" from the end of the array
console.log(lastFruit); // Output: "cherry"
console.log(fruits); // Output: ["apple", "banana"]

//3. shift() - Removes the first element from an array and returns that element.

let firstFruit = fruits.shift(); // Removes "apple" from the beginning of the array
console.log(firstFruit); // Output: "apple"
console.log(fruits); // Output: ["banana"]

//4. unshift() - Adds one or more elements to the beginning of an array and returns the new length of the array.

fruits.unshift("mango"); // Adds "mango" to the beginning of the array
console.log(fruits); // Output: ["mango", "banana"]
console.log(fruits.length); // Output: 2

//5. indexOf() - Returns the first index at which a given element can be found in the array, or -1 if it is not present.

let index = fruits.indexOf("banana"); // Finds the index of "banana"
console.log(index); // Output: 1

//6. includes() - Determines whether an array includes a certain value among its entries, returning true or false as appropriate.

let hasMango = fruits.includes("mango"); // Checks if "mango" is in the array
console.log(hasMango); // Output: true

//7. slice() - Returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included).

let slicedFruits = fruits.slice(0, 1); // Slices the array from index 0 to 1
console.log(slicedFruits); // Output: ["mango"]

//8. splice() - Changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.

fruits.splice(1, 0, "grape"); // Adds "grape" at index 1
console.log(fruits); // Output: ["mango", "grape", "banana"]

fruits.splice(1, 1); // Removes 1 element at index 1
console.log(fruits); // Output: ["mango", "banana"]

//9. forEach() - Executes a provided function once for each array element.

fruits.forEach((fruit) => {
    console.log(fruit); // Output: "mango" and then "banana"
});

//10. map() - Creates a new array populated with the results of calling a provided function on every element in the calling array.

let upperFruits = fruits.map((fruit) => fruit.toUpperCase());
console.log(upperFruits); // Output: ["MANGO", "BANANA"]

//11. filter() - Creates a new array with all elements that pass the test implemented by the provided function.

let longFruits = fruits.filter((fruit) => fruit.length > 5);
console.log(longFruits); // Output: ["banana"]

//12. reduce() - Executes a reducer function on each element of the array, resulting in a single output value.

let totalLength = fruits.reduce((total, fruit) => total + fruit.length, 0);
console.log(totalLength); // Output: 11 (length of "mango" + length of "banana")

/*
4. Mixed-Type Arrays

Theory:

Sometimes we need to store multiple data types in a single array.

We can achieve this using union types.

Example:
*/
let data:(string|number)[]=['apple', 10, 'banana', 20];

//This array can hold both strings and numbers.
data.push("Anil"); // Valid

data.push(300); // Valid

// data.push(true); // Error


/*
5. Readonly Arrays

Theory:

A readonly array prevents modifications to the array through that reference.

It is useful when you want to protect a collection from accidental changes.

Example
*/

const browsers2: readonly string[] = ["chromium", "firefox", "webkit"];

// browsers2.push("safari"); // Error: Property 'push' does not exist on type 'readonly string[]'.
// browsers2[0] = "safari"; // Error: Index signature in type 'readonly string[]' only permits reading.


//Interview question: What is the difference between const array and readonly array?

// const prevents reassignment of the array variable, but allows modification of its contents.
// readonly prevents modifications through that array reference.



/*
Part 2: Tuples in TypeScript
1. What is a Tuple?

Theory:

A tuple is a special type of array where every position has a predefined data type.

In a normal array, elements generally share the same type.

In a tuple, different positions can have different types.

Example:
*/
let employee: [number, string, boolean] = [101, "Chandra", true];

/*
  Array	                               Tuple
Stores multiple elements	Stores multiple elements
Usually one element type	Can have different element types
No fixed positional types	Positional types are defined
Length can vary	Defined length at compile time

Note: Tuples can still be modified using methods such as push().
Their declared positional types are checked at compile time, but they are not automatically immutable.


3. Optional Tuple Elements

Theory:

Sometimes we want a tuple element to be optional.

We can use ? to achieve this.

Example:
let employee: [number, string, boolean?];

employee = [101, "Chandra"];

employee = [102, "Ravi", true];


4. Readonly Tuple

Theory:

A readonly tuple prevents modification of its elements.

Example:

let employee: readonly [number, string, boolean] =
    [101, "Chandra", true];

// employee[0] = 102; // Error




Part 3: Enums in TypeScript
1. What is an Enum?

Theory:

Enum stands for Enumeration.

It is a TypeScript feature that allows us to define a collection of named constants.

Enums are useful when we have a fixed set of related values that we want to represent using meaningful names.

For example:

Browser types
Test execution status
Priority levels
User roles
Application environments

2. Numeric Enum

Theory:

A numeric enum assigns numeric values to its members.

By default, numbering starts from zero and increments automatically.

Example:

enum Status {
    PASS,
    FAIL,
    SKIP
}

console.log(Status.PASS); // Output: 0
console.log(Status.FAIL); // Output: 1
console.log(Status.SKIP); // Output: 2

3. String Enum

Theory:

A string enum assigns string values to its members.

Example:

enum Status {
    PASS = "PASS",
    FAIL = "FAIL",
    SKIP = "SKIP"
}

console.log(Status.PASS);
console.log(Status.FAIL);
console.log(Status.SKIP);


4. Heterogeneous Enum

Theory:

A heterogeneous enum contains both numeric and string values.

Example:
enum Result {
    PASS = 1,
    FAIL = "Failed"
}

console.log(Result.PASS);
console.log(Result.FAIL);

5. Using Enum in Variables

Example:

enum Priority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high"
}

let taskPriority: Priority = Priority.HIGH;

console.log(taskPriority);


Part 4: Objects in TypeScript

This is particularly important for Playwright because we frequently use objects to store test data, configuration, API payloads and user information.

1. What is an Object?

Theory:

An object is a collection of key-value pairs.

Each key is called a property, and each property stores a value.

Objects allow us to group related information into a single structure.

Example:
*/
let employee2 = {
    id: 101,
    name: "Chandra",
    department: "QA",
    isActive: true
};

/*
2. Accessing Object Properties

There are two ways.

Dot notation:

console.log(employee.name);
console.log(employee.department);

Bracket notation:

console.log(employee["name"]);
console.log(employee["department"]);

/*
3. Modifying Object Properties

We can modify object properties using either dot notation or bracket notation.

Example:
*/
employee2.name = "Ravi"; // Using dot notation
employee2["department"] = "Development"; // Using bracket notation

/*
4. Adding New Properties

We can add new properties to an object dynamically.

Example:
*/
//  employee2.salary = 50000; // Adding a new property 'salary'

/*
5. Deleting Properties

*/
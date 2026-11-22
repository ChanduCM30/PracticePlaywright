"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Priority;
(function (Priority) {
    Priority["LOW"] = "low";
    Priority["MEDIUM"] = "medium";
    Priority["HIGH"] = "high";
})(Priority || (Priority = {}));
const testName = "Checkout Flow";
let retries = 2;
let isPassed = false;
const browsers = ["chromium", "firefox"];
const priority = Priority.HIGH;
const result = [testName, isPassed];
const testCase = {
    name: testName,
    priority,
    browsers
};
console.log(testCase);
console.log(`Timeout: ${testCase.timeout ?? 30000}`);
console.log(result);

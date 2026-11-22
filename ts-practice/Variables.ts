enum Priority { LOW = "low", MEDIUM = "medium", HIGH = "high" }

type Browser = "chromium" | "firefox" | "webkit";

const testName: string = "Checkout Flow";
let retries: number = 2;
let isPassed: boolean = false;
const browsers: Browser[] = ["chromium", "firefox"];
const priority: Priority = Priority.HIGH;
const result: [string, boolean] = [testName, isPassed];

const testCase: {
    name: string;
    priority: Priority;
    browsers: Browser[];
    timeout?: number;
} = {
    name: testName,
    priority,
    browsers
};

console.log(testCase);
console.log(`Timeout: ${testCase.timeout ?? 30000}`);
console.log(result);
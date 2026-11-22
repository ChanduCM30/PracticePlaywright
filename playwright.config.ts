import { defineConfig, devices } from '@playwright/test';
import dotenv from "dotenv"

declare const process: { env: Record<string, string | undefined> };

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

dotenv.config({
  path: process.env.ENV ? `./env-files/.env.${process.env.ENV}` : `./env-files/.env.qa`
})

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // globalSetup:"./global-setup.ts",
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,

  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 20,
      maxDiffPixelRatio: 0.10
    }
  },

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: [["html", { outputFolder: "playwright-report",open:'on-failure' }],['dot'],['line'],['perfetto'], ["list"], ["junit", { outputFile: "results.xml" }]],
  reporter: [['html',{open:'on-failure'}],['blob'], ['json', { outputFile: 'report.json' }],['allure-playwright',{open:'always',outputFolder:'allure-results'}]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  timeout: 30000,
  use: {
    headless: false,
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    baseURL: "https://restful-booker.herokuapp.com",
    extraHTTPHeaders: {
      Accept: "application/json"
    },

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    screenshot: 'on',
    // storageState:"./playwright/.auth/auth2.json"

  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name:"setup",
    //   testMatch:/.*\.setup\.ts/
    // },
    {
      name: 'chromium',
      // dependencies:['setup'],
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
      // use: { ...devices['Desktop Chrome'],channel: 'chrome',storageState:"./playwright/.auth/auth.json" },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], channel: 'firefox' },
    },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewport. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

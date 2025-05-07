import { test as base } from '@playwright/test';

//Overwrite the base test   
export const test = base.extend({
    page: async ({ baseURL, page }, use) => {
        if (!baseURL) {
            throw new Error("baseURL is undefined");
        }
        await page.goto(baseURL);
        await use(page);
    },
});

test.use({
    baseURL: 'https://demo.playwright.dev/todomvc/',
})
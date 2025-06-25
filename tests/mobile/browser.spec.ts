import { expect } from '@playwright/test';
import { test } from '../../src/fixture';

test.describe('Browser Test', () => {

    test('Any Browser test 1 - Playwright native', async ({ page }) => {
        await page.goto('https://playwright.dev/');
        await page.locator('//a[@href="/docs/intro"]').first().click();

        let btn = page.locator('//a[@href="/docs/intro"]').first()
        await btn.waitFor({ state: 'visible' });
        await btn.click();
        await page.waitForTimeout(2000);

        const name = await page.innerText('.navbar__title');
        expect(name).toBe('Playwright');

        let btnsearch = page.getByText('Search');
        await btnsearch.waitFor({ state: 'visible' });
        await btnsearch.click();

        let input = page.locator('#docsearch-input');
        await input.waitFor({ state: 'visible' });
        await input.fill('Playwright');
        await input.press('Enter');

    })

    test('Any Browser test 2 - WebdriverIo', async ({ page, driver }) => {
        await driver.url('https://playwright.dev/');

        await page.locator$('button[aria-label="Toggle navigation bar"]').click();  
        await page.locator$('//a[@href="/docs/intro" and @class="menu__link"]').click();

        await driver.pause(2000);

        const name = await page.locator$('.navbar__title').getText();
        expect(name).toBe('Playwright');
    })
})
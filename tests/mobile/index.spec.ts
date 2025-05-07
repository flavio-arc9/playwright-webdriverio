import { expect } from '@playwright/test';
import { test } from '../../src/fixture';

test.describe('Prueba de Github Appium', () => {

    test('Buscar Profile Github', async ({ page, driver }) => { 
        await page.click('android.widget.EditText');
        await page.fill('android.widget.EditText', 'fromeroc9');

        await page.locator$('//android.widget.EditText[@resource-id="user_input"]').click();
        await page.locator$('//android.widget.EditText[@resource-id="user_input"]').setValue("fromeroc9");
        await page.locator$('//android.view.View[@resource-id="search_button"]').click();

        await page.locator$('//android.widget.Button[@content-desc="Show Repositories"]').click();
    
        let repo_exist = await page.locator$('//android.view.View[@index=1]/android.view.View[@resource-id="repo_list"]');
        let repo_text = await repo_exist.isDisplayed();
        
        expect(repo_text).toBe(true);

        await driver.pause(5000);
    })
})
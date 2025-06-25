import { expect } from '@playwright/test';
import { test } from '../../src/fixture';

test.describe('Mobile Test', () => {

    test('Github Android', async ({ page, driver }) => {
        await page.locator$('//android.widget.EditText[@resource-id="user_input"]').click();
        await page.locator$('//android.widget.EditText[@resource-id="user_input"]').setValue("flavio-arc9");
        await page.locator$('//android.view.View[@resource-id="search_button"]').click();

        await page.locator$('//android.widget.Button[@content-desc="Show Repositories"]').click();

        let repo_exist = page.locator$('//android.view.View[@index=1]/android.view.View[@resource-id="repo_list"]');
        let repo_text = await repo_exist.isDisplayed();

        expect(repo_text).toBe(true);

        await driver.pause(5000);
    })

    test('WebdriverIO Android', async ({ page, driver, }) => {
        const btnMenuLogin = page.locator$('~Login');
        const inputEmail = page.locator$('~input-email');
        const inputPassoword = page.locator$('~input-password');
        const btnLogin = page.locator$("~button-LOGIN");
        const alert_title = page.locator$('*//android.widget.TextView[@resource-id="android:id/alertTitle"]');

        await btnMenuLogin.click();
        await inputEmail.setValue('test@webdriver.io')
        await inputPassoword.setValue('Test1234!')

        if (await driver.isKeyboardShown()) {
            await page.locator$('~Login-screen').click();
        }

        await btnLogin.scrollIntoView({
            scrollableElement: await page.locator$('~Login-screen'),
        });

        await btnLogin.click();

        await alert_title.waitForExist({
            timeout: 11000,
            reverse: !true,
        });

        const text = await alert_title.getText();
        console.log("MMMM:", text);
        expect(text).toContain('Success');
    })

    test('WebdriverIO IOS', async ({ page, driver }) => {
        const btnMenuLogin = page.locator$('~Login');
        const inputEmail = page.locator$('~input-email');
        const inputPassoword = page.locator$('~input-password');
        const btnLogin = page.locator$("~button-LOGIN");
        const alert_title = page.locator$('-ios predicate string:type == \'XCUIElementTypeAlert\'');

        await btnMenuLogin.click();

        await inputEmail.setValue('test@webdriver.io')

        await inputPassoword.setValue('Test1234!')

        if (await driver.isKeyboardShown()) {
            await page.locator$('~Login-screen').click();
        }

        await btnLogin.scrollIntoView({
            scrollableElement: await page.locator$('~Login-screen'),
        });

        await btnLogin.click();

        await alert_title.waitForExist({
            timeout: 11000,
            reverse: !true,
        });

        const text = await alert_title.getText();
        expect(text).toContain('Success');
    })

    test('WebdriverIO Android & IOS pararel projects', async ({ page, driver }) => {
        //Lanzar los dos proyecto Android e IOS
        const screenLogin = page.locator$('~Login-screen');

        const btnMenuLogin = page.selector({
            android: '~Login',
            ios: '//XCUIElementTypeButton[@name="Login"]'
        });

        const inputEmail = page.selector({
            android: '~input-email',
            ios: '//XCUIElementTypeTextField[@name="input-email"]'
        });

        const inputPassoword = page.selector({
            android: '~input-password',
            ios: '//XCUIElementTypeSecureTextField[@name="input-password"]'
        });

        const btnLogin = page.selector({
            android: '~button-LOGIN',
            ios: '//XCUIElementTypeOther[@name="button-LOGIN"]'
        });

        const alert_title = page.selector({
            android: '*//android.widget.TextView[@resource-id="android:id/alertTitle"]',
            ios: '-ios predicate string:type == \'XCUIElementTypeAlert\''
        });

        await btnMenuLogin.click();
        await inputEmail.setValue('test@webdriver.io')
        await inputPassoword.setValue('Test1234!')

        if (await driver.isKeyboardShown()) {
            await screenLogin.click();
        }

        await btnLogin.scrollIntoView({
            scrollableElement: await screenLogin,
        });

        await btnLogin.click();

        await alert_title.waitForExist({
            timeout: 11000,
            reverse: !true,
        });

        const text = await alert_title.getText();
        expect(text).toContain('Success');
    })
})
# Playwright-WebDriverIO
Mobile automation test framework integrating Playwright with WebDriverIO.

## Overview
This plugin provides seamless integration between Playwright's powerful testing capabilities and WebDriverIO's mobile automation features via Appium. It enables you to write Playwright tests that control mobile applications on Android and iOS platforms.

## Features
- Run Playwright tests on native mobile apps and mobile browsers
- Use Playwright's testing syntax for element strategies with WebDriverIO's mobile features.
- Support for both Android and iOS platforms
- Simple configuration through Playwright config
- Platform-specific selectors for cross-platform element selection
- Driver availability (Browser in WebdriverIO) in Playwright fixtures
- [Pending] Integrated Playwright Report (Steps, Trace, Image)

# WebDriverIO Limitations and Modifications
To ensure smooth integration with Playwright, certain WebDriverIO features are disabled:

- **WebDriverIO Lifecycle Hooks**: All WebDriverIO hooks (`before*`, `after*`, `on*`) are removed to prevent conflicts. Use Playwright's hooks instead (`beforeEach`, `afterEach`, `beforeAll`, `afterAll`).
- **WebDriverIO Assertions**: WebDriverIO's expect library is not used. Use Playwright's built-in assertions instead.
- **WebDriverIO Configuration**: The configuration is modified to work with Playwright's test runner and to avoid duplicate functionality.
- **Custom Selectors**: WebDriverIO selector strategies are adapted to provide a consistent API through the custom methods (`locator$`, `locator$$`, `selector`, and `selectors`).

## Installation
```sh
npm install playwright-webdriverio --save-dev
```

## Configuration
Create or update your `playwright.config.ts` file:

Used only in the `use` of the playwright configuration
| Option       | Description                                                                         |
| ------------ | ----------------------------------------------------------------------------------- |
| config       | WebDriverIO specific configuration (server options, timeouts, retry settings, etc.) |
| capabilities | Mobile device capabilities for Appium (platform, device settings, app information)  |

```js
import { defineConfig } from "@playwright/test";
import { TestOptions } from "playwright-webdriverio";

export default defineConfig<TestOptions>({
    testDir: './tests',
    use: {
        trace: 'on',
    },
    projects: [
        {
            name: 'Android',
            use: {
                capabilities: {
                    platformName: 'Android',
                    "appium:automationName": "UiAutomator2",
                    "appium:appPackage": "your.app.package",
                    "appium:appActivity": ".MainActivity"
                },
            }
        },
        {
            name: 'iOS',
            use: {
                capabilities: {
                    platformName: 'iOS',
                    "appium:automationName": "XCUITest",
                    "appium:bundleId": "your.app.bundle.id",
                    "appium:udid": "device-udid-here"
                }
            }
        },
        {
            name: 'Browser Safari iOS',
            use: {
                capabilities: {
                    platformName: 'iOS',
                    "appium:browserName": "Safari",
                    "appium:automationName": "XCUITest",
                    "appium:udid": "device-udid-here"
                }
            }
        },
        {
            name: 'Browser Chrome Android',
            use: {
                capabilities: {
                    platformName: 'Android',
                    "appium:browserName": "Chrome",
                    "appium:automationName": "UiAutomator2"
                }
            }
        }
    ]
});
```

## Fixture
Playwright-WebDriverIO provides important fixtures that you can use in your tests:

**driver**
The driver fixture provides direct access to the WebDriverIO browser instance, allowing you to use WebDriverIO-specific commands that aren't wrapped by Playwright:

```js
import { test } from 'playwright-webdriverio';

test('use webdriverio driver directly', async ({ driver }) => {
  // Use WebDriverIO commands directly
  await driver.setOrientation('LANDSCAPE');
  
  // Access device time
  const deviceInfo = await driver.getDeviceTime();
  console.log(deviceInfo);
  
  // Execute other WebDriverIO commands
  await driver.executeScript('mobile: scroll', [{ direction: 'down' }]);
});
```

## Element Selection Methods
Playwright-WebDriverIO provides four methods to find elements:

1. locator$
Finds a single element using CSS or XPath selectors.
```js
const button = page.locator$('.login-button');
await button.click();
```

2. locator$$
Finds multiple elements using CSS or XPath selectors.
```js
const buttons = page.locator$$('.button');
console.log('Number of buttons:', await buttons.length);

// Click on each button
for (const button of buttons) {
  await button.click();
}
```

3. selector
Finds a single element using platform-specific selectors. Accepts either a string or a Selector object with platform-specific selectors.

```js
// Using a Selector object for cross-platform compatibility
const loginButton = page.selector({
  android: 'android=resourceId("com.example.app:id/login_button")',
  ios: '~loginButton',
  web: '.login-btn'
});
await loginButton.click();

// Or using a simple string selector
const submitButton = page.selector('.submit-button');
await submitButton.click();
```

4. selectors
Finds multiple elements using platform-specific selectors. Accepts either a string or a Selector object.

```js
// Using a Selector object
const menuItems = page.selectors({
  android: 'android=className("android.widget.ListView").childSelector(className("android.widget.ListItem"))',
  ios: '~menuItem',
  web: '.menu-item'
});

// Iterate through elements
for (const item of await menuItems) {
  console.log(await item.getText());
}
```
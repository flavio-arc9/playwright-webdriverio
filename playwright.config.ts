import { defineConfig, devices } from "@playwright/test";
import { TestOptions } from "./src";

export default defineConfig<TestOptions>({
    testDir: './tests',
    outputDir: 'build/logs',
    timeout: 1 * 60 * 1000,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 3 : 0,
    reporter: [
        ['html', { outputFolder: 'build/runs', open: 'never' }],
        ['list', { printSteps: true }],
    ],
    workers: 2,
    fullyParallel: false,
    use: {
        trace: 'on',
        // headless: false,
        // capabilities: {
        //     platformName: 'Android',
        //     "appium:automationName": "UiAutomator2",
        //     "appium:appPackage": "com.wdiodemoapp",
        //     "appium:appActivity": ".MainActivity"
        // }
        // capabilities: {
        //     platformName: 'IOS',
        //     "appium:automationName": "XCUITest",
        //     "appium:bundleId": "org.reactjs.native.example.wdiodemoapp",
        //     "appium:udid": "CED003A3-85B7-4780-B42E-EA5BF16DB5BB"
        // }
    },
    projects: [
        {
            name: 'Playwright Browser',
            use: { ...devices['Desktop Chrome'] }
        },
        {
            name: 'Github Android',
            use: {
                capabilities: {
                    platformName: 'Android',
                    "appium:automationName": "UiAutomator2",
                    "appium:appPackage": "com.example.appetize",
                    "appium:appActivity": ".MainActivity"
                },
            }
        },
        {
            name: 'WebdriverIO Android',
            use: {
                capabilities: {
                    platformName: 'Android',
                    "appium:automationName": "UiAutomator2",
                    "appium:appPackage": "com.wdiodemoapp",
                    "appium:appActivity": ".MainActivity"
                },
            }
        },
        {
            name: 'WebdriverIO IOS',
            use: {
                capabilities: {
                    platformName: 'IOS',
                    "appium:automationName": "XCUITest",
                    "appium:bundleId": "org.reactjs.native.example.wdiodemoapp",
                    "appium:udid": "CED003A3-85B7-4780-B42E-EA5BF16DB5BB"
                }
            }
        },
        {
            name: 'Safari Mobile IOS',
            use: {
                capabilities: {
                    platformName: 'IOS',
                    "appium:browserName": "Safari",
                    "appium:automationName": "XCUITest",
                    "appium:udid": "CED003A3-85B7-4780-B42E-EA5BF16DB5BB"
                }
            }
        },
        {
            name: 'Chrome Mobile Android',
            use: {
                capabilities: {
                    platformName: 'Android',
                    "appium:browserName": "Chrome",
                    "appium:automationName": "UiAutomator2"
                }
            }
        }
    ]
})
import type { Browser } from "webdriverio";

export interface Selector {
    android?: string;
    ios?: string;
    web?: string;
    mobile?: string;
}

export function getSelector(driver: Browser, locator: Selector | string): string {
    let locators: string | undefined;

    if (typeof locator === 'string') {
        locators = locator;
    } else {
        locators =  driver.isAndroid ? locator.android :
                    driver.isIOS ? locator.ios :
                    driver.isMobile ? locator.mobile :
                    (driver.isChromium || driver.isFirefox || driver.isSeleniumStandalone || driver.isW3C) ? locator.web : undefined;
    }

    if (locators) {
        return locators;
    }

    throw new Error('No valid locator found for the current platform');
}
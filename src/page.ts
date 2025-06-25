import { getSelector, Selector } from "./selector";
import { Context } from "./types";

const setExtend = (driver: Context) => ({
    locator$: (locator: string) => driver.$(locator),
    locator$$: (locator: string) => driver.$$(locator),
    selector: (locator: string | Selector) => {
        const selector = getSelector(driver, locator);
        return driver.$(selector);
    },
    selectors: (locator: string | Selector) => {
        const selector = getSelector(driver, locator);
        return driver.$$(selector);
    }
});

export { setExtend };
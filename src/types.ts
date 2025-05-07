import { PlaywrightTestArgs, PlaywrightTestOptions, PlaywrightWorkerArgs, PlaywrightWorkerOptions } from "@playwright/test";
import { Page as BasePage } from '@playwright/test';
import { RequestedStandaloneCapabilities } from "@wdio/types/build/Capabilities";
import { Browser, ChainablePromiseArray, ChainablePromiseElement } from "webdriverio";
import { Selector } from "./selector";

export type IORemote = IOConfig & {
    capabilities: IOCapabilities;
};

/**
 * A modified version of the WebDriverIO configuration that omits all lifecycle hooks.
 * 
 * All WebDriverIO hooks (before*, after*, on*) have been removed because it's recommended 
 * to use Playwright's own hooks for test lifecycle management. This prevents potential 
 * conflicts and confusion when two separate hook systems would be running simultaneously.
 * 
 * For test setup and teardown, use Playwright's fixtures and hooks like beforeEach, 
 * afterEach, beforeAll, and afterAll.
 */
export type IOConfig = Omit<WebdriverIO.Config,
    'capabilities' |
    'onComplete' |
    'onPrepare' |
    'onReload' |
    'onWorkerStart' |
    'onWorkerEnd' |
    'before' |
    'beforeAssertion' |
    'beforeCommand' |
    'beforeHook' |
    'beforeSession' |
    'beforeSuite' |
    'beforeTest' |
    'beforeFeature' |
    'beforeScenario' |
    'beforeStep' |
    'after' |
    'afterAssertion' |
    'afterCommand' |
    'afterHook' |
    'afterSession' |
    'afterSuite' |
    'afterTest' |
    'afterFeature' |
    'afterScenario' |
    'afterStep'
>

export type IOCapabilities = RequestedStandaloneCapabilities

export interface TestOptions extends PlaywrightTestOptions {
    capabilities: IOCapabilities;
    config: IOConfig;
}

export interface TestArgs extends PlaywrightTestArgs, TestOptions {
    /**
     * The WebDriverIO browser instance that gives access to WebDriverIO's browser API commands.
     * This represents the main browser context for WebDriverIO interaction.
     * See: https://webdriver.io/docs/api/browser
     */
    driver: Context
    /**
     * Extended Playwright Page interface that adds limited WebDriverIO element selection capabilities.
     * 
     * While the WebDriverIO Browser API offers many functions, only locator$ and locator$$ are exposed
     * in this hybrid interface due to compatibility constraints between Playwright and WebDriverIO.
     * 
     * This allows using Playwright's native methods alongside select WebDriverIO element selection
     * and interaction methods on the same page object.
     */
    page: Page
}

/**
 * Context represents WebDriverIO's Browser instance, providing access to all WebDriverIO browser commands.
 * See: https://webdriver.io/docs/api/browser
 */
export type Context = Browser;

export type WorkerArgs = PlaywrightWorkerArgs & PlaywrightWorkerOptions;

export interface Page extends BasePage {
    /**
     * The `locator$` command is a WebDriverIO method that finds an element in the page using 
     * CSS or XPath selectors.
     * 
     * It returns a WebDriverIO element that can be used to perform actions like click, setText, etc.
     * 
     * @param selector  A CSS or XPath selector to query the element
     * @return ChainablePromiseElement  WebDriverIO element object for the found element
     * 
     * @example
     * ```ts
     * // using CSS selector
     * const button = page.locator$('.btn');
     * await button.click();
     * 
     * // using XPath selector
     * const header = page.locator$('//h1');
     * console.log(await header.getText());
     * ```
     */
    locator$: (selector: string) => ChainablePromiseElement;
    /**
     * The `locator$$` command is a WebDriverIO method that finds multiple elements in the page using 
     * CSS or XPath selectors.
     * 
     * It returns an array of WebDriverIO elements that can be used to perform actions on each element.
     * 
     * @param selector  A CSS or XPath selector to query the elements
     * @return ChainablePromiseArray  Array of WebDriverIO element objects for the found elements
     * 
     * @example
     * ```ts
     * // using CSS selector
     * const buttons = page.locator$$('.btn');
     * console.log('Number of buttons found:', buttons.length);
     * 
     * // clicking each button in the collection
     * for (const button of buttons) {
     *   await button.click();
     * }
     * 
     * // using XPath selector
     * const headers = page.locator$$('//h2');
     * const headerTexts = await Promise.all(headers.map(header => header.getText()));
     * console.log(headerTexts);
     * ```
     */
    locator$$: (selector: string) => ChainablePromiseArray;
    /**
     * The `selector` method finds an element using platform-specific selectors.
     * 
     * This method enhances `locator$` by accepting either a string selector or a `Selector` 
     * object that can contain different selectors for various platforms (android, ios, web, mobile).
     * The appropriate selector is chosen based on the current platform.
     * 
     * @param selector  A string selector or `Selector` object with platform-specific selectors
     * @return ChainablePromiseElement  WebDriverIO element object for the found element
     * 
     * @example
     * ```ts
     * // using string selector
     * const button = page.selector('.submit-button');
     * await button.click();
     * 
     * // using platform-specific Selector object
     * const menuButton = page.selector({
     *   android: '-android=resourceId("com.example.app:id/menu_button")',
     *   ios: '~Menu',
     *   web: '#menuBtn'
     * });
     * await menuButton.click();
     * ```
     */
    selector: (selector: Selector | String) => ChainablePromiseElement;
      /**
     * The `selectors` method finds multiple elements using platform-specific selectors.
     * 
     * This method enhances `locator$$` by accepting either a string selector or a `Selector` 
     * object that can contain different selectors for various platforms (android, ios, web, mobile).
     * The appropriate selector is chosen based on the current platform.
     * 
     * @param selector  A string selector or `Selector` object with platform-specific selectors
     * @return ChainablePromiseArray  Array of WebDriverIO element objects for the found elements
     * 
     * @example
     * ```ts
     * // using string selector
     * const buttons = page.selectors('.btn');
     * console.log('Number of buttons found:', buttons.length);
     * 
     * // using platform-specific Selector object
     * const listItems = page.selectors({
     *   android: '-android=className("android.widget.ListView").childSelector(className("android.widget.ListItem"))',
     *   ios: '//XCUIElementTypeTable//XCUIElementTypeCell',
     *   web: '.list-item'
     * });
     * 
     * const itemTexts = await Promise.all(listItems.map(item => item.getText()));
     * console.log(itemTexts);
     * ```
     */
    selectors: (selector: Selector | String) => ChainablePromiseArray;
}
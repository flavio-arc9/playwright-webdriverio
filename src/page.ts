import { Session, test } from ".";
import { getSelector, Selector } from "./selector";
import { Context, IORemote } from "./types";

let _session: Session;
let _driver: Context | undefined;

const getDriver = () => {
    if (!_driver) {
        throw new Error("Driver is not initialized.");
    }
    return _driver;
}

const getStartSession = async (config: IORemote) => {
    _session = new Session(config);

    _driver = await test.step(
        "Start Automate session",
        async () => {
            return await _session.create();
        },
        { box: true }
    )

    test.info().annotations.push({
        type: 'Automate Session',
        description: `${JSON.stringify(config.capabilities, null, 2)}`,
    })

    test.info().annotations.push({
        type: 'Session ID',
        description: `${_driver.sessionId}`,
    })
    return { _driver, _session };
}

const getStopSession = async () => {
    await test.step("Stop Automate session", 
        async () => {
            await _session.deleteSession()
        },
        { box: true }
    );
}

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

export { getStartSession, getStopSession, setExtend, getDriver };
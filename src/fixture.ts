import { test as base, TestType } from '@playwright/test';
import { IOCapabilities, IOConfig, IORemote, Page, TestArgs, TestOptions, WorkerArgs } from './types';
import { setExtend, getStartSession, getDriver, getStopSession } from '.';

const _test = base.extend<
    TestArgs & {
        _useCapabilities: IOCapabilities;
        _useConfig: IOConfig;
    }
>({
    config: [
        async ({ _useConfig }, use, testInfo) => {
            const merge = {
                ...(testInfo.project.use as TestOptions).config,
                ..._useConfig,
            };
            await use(merge);
        },
        { auto: true },
    ],
    capabilities: [
        async ({ _useCapabilities }, use, testInfo) => {
            const merge = {
                ...(testInfo.project.use as TestOptions).capabilities,
                ..._useCapabilities
            }
            await use(merge);
        },
        { auto: true }
    ],
    driver: [
        async ({ }, use) => {
            const driver = getDriver();
            await use(driver);
        },
        { auto: false }
    ],
    page: async ({ page, config, capabilities, baseURL }, use, devices) => {
        const mergeConfig: IORemote = {
            ...config,
            capabilities: capabilities,
            baseUrl: baseURL || config.baseUrl,
        };

        const { _session, _driver } = await getStartSession(mergeConfig);

        let mergePage: Page = Object.assign(page, {
            ...page,
            ...setExtend(_driver),
        });

        try {
            if (!_session) {
                throw new Error("Session is not initialized.");
            }

            if (!_driver) {
                throw new Error("Driver is not initialized.");
            }

            await use(mergePage);
        } catch (error) {
            console.error("Error initializing session:", error);
            throw error;
        } finally {
            await getStopSession();
        }
    },
    _useConfig: [{}, { option: true }],
    _useCapabilities: [{}, { option: true }],
})

Object.assign(_test, {
    setup(this: TestType<TestArgs, WorkerArgs>, options: TestOptions) {
        return test.use({
            config: options.config,
            capabilities: options.capabilities
        });
    },
});

export const test = _test as TestType<TestArgs, WorkerArgs>;
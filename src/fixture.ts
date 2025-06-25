import { test as base, TestType } from '@playwright/test';
import { IOCapabilities, IOConfig, IORemote, IOSession, Page, TestArgs, TestOptions, WorkerArgs } from './types';
import { setExtend, Session } from '.';

const _test = base.extend<
    TestArgs & {
        _useCapabilities: IOCapabilities;
        _useConfig: IOConfig;
        _useSession: IOSession;
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
        async ({ _useSession }, use) => {
            if (!_useSession) {
                base.skip(true, "El fixture 'driver' no está disponible para proyectos no móviles.");
                return;
            }
            await use(_useSession.driver);
        },
        { scope: 'test' }
    ],
    page: [
        async ({ page, _useSession }, use) => {
            if (!_useSession) {
                await use(page);
                return;
            }

            const extendedPage: Page = Object.assign(page, {
                ...setExtend(_useSession.driver),
            });
            await use(extendedPage);

        }, { scope: 'test' }
    ],
    _useConfig: [{}, { option: true }],
    _useCapabilities: [{}, { option: true }],
    _useSession: [
        async ({ config, capabilities, baseURL }, use) => {
            const mergeConfig: IORemote = {
                ...config,
                capabilities: capabilities,
                baseUrl: baseURL || config.baseUrl,
            };

            const session = Session.isValid(mergeConfig);
            if (!session) {
                await use(null);
                return;
            }

            const driver = await base.step("Start Automate session", () => session.create(), { box: true });
            base.info().annotations.push({
                type: 'Session ID',
                description: `${driver.sessionId}`,
            });

            base.info().annotations.push({
                type: 'Automate Session',
                description: `${JSON.stringify(mergeConfig.capabilities, null, 2)}`,
            });

            await use({ driver, session });

            await base.step("Stop Automate session", () => session.deleteSession(), { box: true });
        }, { scope: 'test' }
    ]
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
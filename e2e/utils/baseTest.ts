import { test as baseTest } from '@playwright/test';

import { coverage } from './coverage';
import { MainPageObject } from './MainPageObject';

type FixtureWithCoverage = {
    mainPage: MainPageObject;
};

export type { Page } from '@playwright/test';

export const test = baseTest.extend<FixtureWithCoverage>({
    mainPage: async ({ page }, use, testInfo) => {
        await coverage.start(page, testInfo);

        const mainPage = new MainPageObject(page, test.expect);

        await use(mainPage);

        await coverage.collect(page, testInfo);
    },
});

export const expect = test.expect;

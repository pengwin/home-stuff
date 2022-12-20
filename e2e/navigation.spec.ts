import { test } from '@playwright/test';

import { coverage } from './utils/coverage';

test.describe('Navigation tests', () => {
    test('Click on all navigation buttons', async ({ page }, testInfo) => {
        await coverage.start(page, testInfo);

        await page.goto('/');
        const navs = await page
            .locator('.drawer-side')
            .getByRole('navigation')
            .elementHandles();
        for (const nav of navs) {
            await nav.click();
            const href = await nav.getAttribute('href');
            test.fail(href == null, 'Href is null');
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await page.waitForURL(href!);
        }

        await coverage.collect(page, testInfo);
    });
});

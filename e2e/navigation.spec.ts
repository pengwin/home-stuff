import { test } from './utils/baseTest';

test.describe('Navigation tests', () => {
    test('Click on all navigation buttons', async ({ mainPage }) => {
        await mainPage.goToIndex();
        const navs = await mainPage.originalPage
            .locator('.drawer-side')
            .getByRole('navigation')
            .elementHandles();
        for (const nav of navs) {
            await nav.click();
            const href = await nav.getAttribute('href');
            test.fail(href == null, 'Href is null');
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await mainPage.originalPage.waitForURL(href!);
        }
    });
});

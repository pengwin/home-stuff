import { test, expect } from '@playwright/test';

import { locale } from '../src/locale';
import { cssClasses } from '../src/pages/test/Сomp/css-classes';
import { coverage } from './utils/coverage';

test.describe('Localization tests', () => {
    test('Should show button in english and switch language from en to run and back on click on switch lang button', async ({
        page,
    }, testInfo) => {
        await coverage.start(page, testInfo);

        await page.goto('/test/comp/test');
        const btn = await page.locator(`.${cssClasses.btnSwitchLang}`);
        await expect(btn).toHaveText(locale.en.Comp.SwitchLang);
        await btn.click();
        await expect(btn).toHaveText(locale.ru.Comp.SwitchLang);
        await btn.click();
        await expect(btn).toHaveText(locale.en.Comp.SwitchLang);

        await coverage.collect(page, testInfo);
    });
});

/*test('homepage has title and links to intro page', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);

  // create a locator
  const getStarted = page.getByRole('link', { name: 'Get started' });

  // Expect an attribute "to be strictly equal" to the value.
  //await expect(getStarted).toHaveAttribute('href', '/docs/intro');

  // Click the get started link.
  await getStarted.click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});*/

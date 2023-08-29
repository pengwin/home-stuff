import { test, expect } from './utils/baseTest';

import { locales } from '../src/locale/locales';
import { cssClasses } from '../src/pages/test/Сomp/css-classes';

test.describe('Localization tests', () => {
    test('Should show button in english and switch language from en to run and back on click on switch lang button', async ({
        mainPage,
    }) => {
        await mainPage.originalPage.goto('/test/comp/test');
        const btn = await mainPage.originalPage.locator(
            `.${cssClasses.btnSwitchLang}`,
        );
        await expect(btn).toHaveText(locales.en.pages.test.Comp.SwitchLang);
        await btn.click();
        await expect(btn).toHaveText(locales.ru.pages.test.Comp.SwitchLang);
        await btn.click();
        await expect(btn).toHaveText(locales.en.pages.test.Comp.SwitchLang);
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

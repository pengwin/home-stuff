/// <reference types="cypress" />

import { locale } from '../../../src/locale';
import { cssClasses } from '../../../src/Comp/css-classes';

describe('Localization tests', () => {
    it('Should show button in english and switch language from en to run and back on click on switch lang button', () => {
        cy.visit('/');
        const btn = cy.get(`.${cssClasses.btnSwitchLang}`);
        btn.contains(locale.en.Comp.SwitchLang);
        btn.click();
        btn.contains(locale.ru.Comp.SwitchLang);
        btn.click();
        btn.contains(locale.en.Comp.SwitchLang);
    });
});

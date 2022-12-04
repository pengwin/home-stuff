import { describe, expect, Nullable, test, afterEach } from 'vitest';

import { render, fireEvent } from 'solid-testing-library';

import { I18nContext, createI18nContext } from '@solid-primitives/i18n';

import matchers from '@testing-library/jest-dom/matchers';

import { default as Comp } from './Comp';
import { cssClasses } from './css-classes';

expect.extend(matchers);

function createLocaleDict() {
    return {
        ru: {
            Comp: {
                SwitchLang: 'Переключить язык',
                Flip: 'Перевернуть',
            },
        },
        en: {
            Comp: {
                SwitchLang: 'Switch lang',
                Flip: 'Flip',
            },
        },
    };
}

const renderComp = (text?: string, lang?: string) => {
    const dict = createLocaleDict();
    const textVal = text || 'test';
    const langVal = lang || 'en';
    const value = createI18nContext(dict, langVal);
    return render(() => (
        <I18nContext.Provider value={value}>
            <Comp text={textVal} />
        </I18nContext.Provider>
    ));
};

describe('<Comp />', () => {
    let componentUnmount: Nullable<() => void> = null;

    afterEach(() => {
        if (componentUnmount) {
            componentUnmount();
        }
    });

    describe('Flip', () => {
        test('it will render a text', () => {
            const { getByText, unmount } = renderComp();
            componentUnmount = unmount;
            expect(getByText('test')).toBeInTheDocument();
        });

        test('should Flip have button', async () => {
            const { container, unmount } = renderComp();
            componentUnmount = unmount;
            const btnFlip = container.getElementsByClassName(
                cssClasses.btnFlip,
            )[0];
            expect(btnFlip).toBeInTheDocument();
        });

        test.each([
            ['text', 'TEXT'],
            ['TEXT', 'text'],
        ])(
            'should flip %s to %s on click back and forth',
            async (text: string, expected: string) => {
                const { container, getByText, unmount } = renderComp(text);
                componentUnmount = unmount;
                const btnFlip = container.getElementsByClassName(
                    cssClasses.btnFlip,
                );
                fireEvent.click(btnFlip[0]);
                expect(getByText(expected)).toBeInTheDocument();
                fireEvent.click(btnFlip[0]);
                expect(getByText(text)).toBeInTheDocument();
            },
        );
    });

    describe('Switch lang', () => {
        const dict = createLocaleDict();

        test('should have "switch lang" button', () => {
            const { getByText, unmount } = renderComp();
            componentUnmount = unmount;
            expect(getByText(dict.en.Comp.SwitchLang)).toBeInTheDocument();
        });

        test.each([
            [5, 'en', dict.en.Comp.SwitchLang],
            [3, 'ru', dict.ru.Comp.SwitchLang],
        ])(
            '%d:[%s] "switch lang" button should switch lang and label on click from "%s" to "%s" and back.',
            async (testNo: number, lang: string, expected: string) => {
                const { unmount, container } = renderComp('', lang);
                componentUnmount = unmount;

                const getSwitchButton = (): [
                    HTMLButtonElement,
                    HTMLSpanElement,
                ] => {
                    const btn = container.getElementsByClassName(
                        cssClasses.btnSwitchLang,
                    )[0];
                    expect(btn).toBeInTheDocument();
                    const btnLabel = btn.getElementsByTagName('span')[0];
                    expect(btnLabel).toBeInTheDocument();
                    return [btn as HTMLButtonElement, btnLabel];
                };

                const [btn, btnLabel] = getSwitchButton();
                expect(btnLabel.innerHTML).toBe(expected);
                await fireEvent.click(btn);
            },
        );
    });
});

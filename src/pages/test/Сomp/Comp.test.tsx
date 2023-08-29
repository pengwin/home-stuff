import { describe, expect, test, afterEach } from 'vitest';
import { cleanup, render, fireEvent } from '@solidjs/testing-library';
import '@testing-library/jest-dom';

import { LocaleProvider, locales, useI18n } from '~/locale';

import { Comp } from './Comp';
import { cssClasses } from './css-classes';

const renderComp = (text?: string, lang?: string) => {
    const textVal = text || 'test';
    const langVal = lang || 'en';

    const InnerComp = () => {
        const [_, { setLocale }] = useI18n();
        setLocale(langVal);
        return <Comp text={textVal} />;
    };

    return render(() => {
        return (
            <LocaleProvider>
                <InnerComp />
            </LocaleProvider>
        );
    });
};

describe('<Comp />', () => {
    afterEach(cleanup);

    describe('Flip', () => {
        test('it will render a text', () => {
            const { getByText } = renderComp();

            expect(getByText('test')).toBeInTheDocument();
        });

        test('should Flip have button', async () => {
            const { container } = renderComp();

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
                const { container, getByText } = renderComp(text);

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
        test('should have "switch lang" button', () => {
            const { getByText } = renderComp();

            expect(
                getByText(locales.en.pages.test.Comp.SwitchLang),
            ).toBeInTheDocument();
        });

        test.each([
            [5, 'en', locales.en.pages.test.Comp.SwitchLang],
            [3, 'ru', locales.ru.pages.test.Comp.SwitchLang],
        ])(
            '%d:[%s] "switch lang" button should switch lang and label on click from "%s" to "%s" and back.',
            async (testNo: number, lang: string, expected: string) => {
                const { container } = renderComp('', lang);

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

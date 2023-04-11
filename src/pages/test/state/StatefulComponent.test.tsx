import { describe, expect, Nullable, test, afterEach } from 'vitest';

import { render, fireEvent } from '@solidjs/testing-library';

import { CounterProvider } from '~/store';
import { LocaleProvider, locales } from '~/locale';
import StatefulComponent from './StatefulComponent';

const renderComp = () => {
    const res = render(() => (
        <CounterProvider initialCounter={0}>
            <LocaleProvider defaultLang="en">
                <StatefulComponent />
            </LocaleProvider>
        </CounterProvider>
    ));

    return res;
};

describe('<StatefulComponent />', () => {
    let componentUnmount: Nullable<() => void> = null;

    afterEach(() => {
        if (componentUnmount) {
            componentUnmount();
        }
    });

    describe('Inc', () => {
        test('it will render a zero', () => {
            const { unmount, getByRole } = renderComp();
            componentUnmount = unmount;
            expect(getByRole('presentation')).toHaveTextContent('0');
        });

        test('should have button Inc', async () => {
            const { unmount, queryByRole } = renderComp();
            componentUnmount = unmount;

            expect(queryByRole('button', { name: '+' })).toBeInTheDocument();
        });

        test('should have button Reset', async () => {
            const { unmount, queryByRole } = renderComp();
            componentUnmount = unmount;

            expect(
                queryByRole('button', {
                    name: locales.en.pages.test.state.reset,
                }),
            ).toBeInTheDocument();
        });

        test('should increase', async () => {
            const { unmount, getByRole } = renderComp();
            componentUnmount = unmount;

            fireEvent.click(getByRole('button', { name: '+' }) as HTMLElement);

            expect(getByRole('presentation')).toHaveTextContent('1');
        });
    });
});

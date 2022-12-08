import { describe, expect, Nullable, test, afterEach } from 'vitest';

import { render, fireEvent } from 'solid-testing-library';

import matchers from '@testing-library/jest-dom/matchers';

import { CounterProvider } from '~/store';
import StatefulComponent from './StatefulComponent';

expect.extend(matchers);

const renderComp = () => {
    const res = render(() => (
        <CounterProvider initialCounter={0}>
            <StatefulComponent />
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
                queryByRole('button', { name: 'reset' }),
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

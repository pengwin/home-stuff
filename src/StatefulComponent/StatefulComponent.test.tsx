import { describe, expect, Nullable, test, afterEach } from 'vitest';

import { render, fireEvent } from 'solid-testing-library';

import { StoreonProvider } from '@storeon/solidjs';
import { createStoreon } from 'storeon';

import matchers from '@testing-library/jest-dom/matchers';

import { counterModule } from '../store';
import { default as StatefulComponent } from './StatefulComponent';

expect.extend(matchers);

const renderComp = () => {
    const store = createStoreon([counterModule]);
    const res = render(() => (
        <StoreonProvider store={store}>
            <StatefulComponent />
        </StoreonProvider>
    ));

    return {
        ...res,
        queryByRole: res.queryByRole,
        getByRole: res.getByRole,
        store,
    };
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

            expect(queryByRole('button', { name: 'inc' })).toBeInTheDocument();
        });

        test('should have button Reset', async () => {
            const { unmount, queryByRole } = renderComp();
            componentUnmount = unmount;

            expect(
                queryByRole('button', { name: 'reset' }),
            ).toBeInTheDocument();
        });

        test('should increase', async () => {
            const { container, unmount, debug, getByRole, store } =
                renderComp();
            componentUnmount = unmount;

            fireEvent.click(
                getByRole('button', { name: 'inc' }) as HTMLElement,
            );

            debug(container);

            expect(store.get().counter).toBe(1);
        });
    });
});

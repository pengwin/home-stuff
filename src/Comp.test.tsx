import { describe, expect, test } from 'vitest';

import { render, fireEvent } from 'solid-testing-library';

import matchers from '@testing-library/jest-dom/matchers';

import Comp from './Comp';

expect.extend(matchers);

describe('<Comp />', () => {
    test('it will render a text', () => {
        const { getByText, unmount } = render(() => <Comp text='test' />);
        expect(getByText('test')).toBeInTheDocument();
        unmount();
    });

    test('should have button', async () => {
        const { getByText, unmount } = render(() => <Comp text='test' />);
        expect(getByText('Flip')).toBeInTheDocument();
        unmount();
    });

    test.each([
        ['text', 'TEXT'],
        ['TEXT', 'text']
    ])
        ('should flip %p to %p on click back and forth', async (text: string, expected: string) => {
            const { getByText, unmount } = render(() => <Comp text={text} />);
            const btn = getByText('Flip');
            fireEvent.click(btn as HTMLInputElement);
            expect(getByText(expected)).toBeInTheDocument();
            fireEvent.click(btn as HTMLInputElement);
            expect(getByText(text)).toBeInTheDocument();
            unmount();
        });
});
import { describe, expect, test } from 'vitest';

import matchers from '@testing-library/jest-dom/matchers';

import { render, fireEvent } from 'solid-testing-library';

import Comp from './Comp';

expect.extend(matchers);

describe('<Comp />', () => {
    test('it will render a text', () => {
      const { getByPlaceholderText, getByText, unmount } = render(() => <Comp text='test' />);
      expect(getByText('test')).toBeInTheDocument();
      unmount();
    });

    test('failed', () => {
        const { getByPlaceholderText, getByText, unmount } = render(() => <Comp text='test' />);
        expect(getByText('test1')).toBeInTheDocument();
        unmount();
      });
});
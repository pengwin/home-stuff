import { describe, expect, test } from 'vitest';

import matchers from '@testing-library/jest-dom/matchers';

import { render, fireEvent } from 'solid-testing-library';

import Comp from './Comp';

expect.extend(matchers);

describe('<Comp />', () => {
    test('it will render a text', () => {
      const { getByText, unmount } = render(() => <Comp text='test' />);
      expect(getByText('test')).toBeInTheDocument();
      unmount();
    });

    test('it will render a text', () => {
        const { getByText, unmount } = render(() => <Comp text='some text' />);
        expect(getByText('some text')).toBeInTheDocument();
        unmount();
      });
});
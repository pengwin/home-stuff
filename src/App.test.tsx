import { describe, expect, test } from 'vitest';

import matchers from '@testing-library/jest-dom/matchers';

import { render } from 'solid-testing-library';

import App from './App';

expect.extend(matchers);

describe('<App /> smoke tests', () => {
    test('it will render successfully', () => {
        const { unmount } = render(() => <App />);
        unmount();
    });
});

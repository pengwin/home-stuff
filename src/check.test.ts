import { describe, test } from 'vitest';

import { check } from './check';

describe('check', () => {
    test('it will render a text', () => {
        check('a');
    });
});

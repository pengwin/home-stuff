import { describe, expect, test } from 'vitest';

import { replace } from './coverage-badge-updater.mjs';

describe('coverage-badge-updater', () => {
    describe('replace', () => {
        test.each([
            [100, 'brightgreen'],
            [83, 'green'],
            [50, 'yellow'],
            [5, 'red'],
        ])('Unit_Test_Coverage %d+%s', (pct: number, color: string) => {
            const content =
                '[![CI Build](https://github.com/pengwin/home-stuff/actions/workflows/ci.yml/badge.svg)](https://github.com/pengwin/home-stuff/actions/workflows/ci.yml)\n' +
                '![](https://img.shields.io/badge/Unit_Test_Coverage-100%-0000FF.svg?prefix=$lines$)\n' +
                '![](https://img.shields.io/badge/E2E_Coverage-100%-FF00FF.svg?prefix=$lines$)\n';

            const expectedContent =
                '[![CI Build](https://github.com/pengwin/home-stuff/actions/workflows/ci.yml/badge.svg)](https://github.com/pengwin/home-stuff/actions/workflows/ci.yml)\n' +
                `![](https://img.shields.io/badge/Unit_Test_Coverage-${pct}%-${color}.svg?prefix=$lines$)\n` +
                '![](https://img.shields.io/badge/E2E_Coverage-100%-FF00FF.svg?prefix=$lines$)\n';

            const actual = replace(content, 'Unit_Test_Coverage', pct);
            expect(actual).toBe(expectedContent);
        });

        test.each([
            [100, 'brightgreen'],
            [83, 'green'],
            [50, 'yellow'],
            [5, 'red'],
        ])('E2E_Coverage %d+%s', (pct: number, color: string) => {
            const content =
                '[![CI Build](https://github.com/pengwin/home-stuff/actions/workflows/ci.yml/badge.svg)](https://github.com/pengwin/home-stuff/actions/workflows/ci.yml)\n' +
                '![](https://img.shields.io/badge/Unit_Test_Coverage-100%-0000FF.svg?prefix=$lines$)\n' +
                '![](https://img.shields.io/badge/E2E_Coverage-100%-FF00FF.svg?prefix=$lines$)\n';

            const expectedContent =
                '[![CI Build](https://github.com/pengwin/home-stuff/actions/workflows/ci.yml/badge.svg)](https://github.com/pengwin/home-stuff/actions/workflows/ci.yml)\n' +
                '![](https://img.shields.io/badge/Unit_Test_Coverage-100%-0000FF.svg?prefix=$lines$)\n' +
                `![](https://img.shields.io/badge/E2E_Coverage-${pct}%-${color}.svg?prefix=$lines$)\n`;

            const actual = replace(content, 'E2E_Coverage', pct);
            expect(actual).toBe(expectedContent);
        });
    });
});

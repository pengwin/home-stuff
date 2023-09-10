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
                '![UnitTestCoverage](https://img.shields.io/badge/Unit_Test_Coverage-100%-0000FF)\n' +
                '![E2ECoverage](https://img.shields.io/badge/E2E_Coverage-100%-FF00FF)\n';

            const expectedContent =
                '[![CI Build](https://github.com/pengwin/home-stuff/actions/workflows/ci.yml/badge.svg)](https://github.com/pengwin/home-stuff/actions/workflows/ci.yml)\n' +
                `![UnitTestCoverage](https://img.shields.io/badge/Unit_Test_Coverage-${pct}%25-${color})\n` +
                '![E2ECoverage](https://img.shields.io/badge/E2E_Coverage-100%-FF00FF)\n';

            const actual = replace(
                content,
                'UnitTestCoverage',
                'Unit_Test_Coverage',
                pct,
            );
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
                '![UnitTestCoverage](https://img.shields.io/badge/Unit_Test_Coverage-100%-0000FF)\n' +
                '![E2ECoverage](https://img.shields.io/badge/E2E_Coverage-100%-FF00FF)\n';

            const expectedContent =
                '[![CI Build](https://github.com/pengwin/home-stuff/actions/workflows/ci.yml/badge.svg)](https://github.com/pengwin/home-stuff/actions/workflows/ci.yml)\n' +
                '![UnitTestCoverage](https://img.shields.io/badge/Unit_Test_Coverage-100%-0000FF)\n' +
                `![E2ECoverage](https://img.shields.io/badge/E2E_Coverage-${pct}%25-${color})\n`;

            const actual = replace(content, 'E2ECoverage', 'E2E_Coverage', pct);
            expect(actual).toBe(expectedContent);
        });
    });
});

import { describe, expect, test } from 'vitest';

import dayjs from 'dayjs';

import { formatDate } from './date-formatter';

describe('formatDate', () => {
    const options = {
        justNow: 'just now',
        dateFormat: 'YYYY-MM-DD',
        nDaysAgo: (n: number) => (n === 1 ? 'A day ago' : `${n} days ago`),
        nHoursAgo: (n: number) => (n === 1 ? 'An hour ago' : `${n} hours ago`),
        nMinutesAgo: (n: number) =>
            n === 1 ? 'A minute ago' : `${n} minutes ago`,
        nDaysAgoThreshold: 10,
    };

    test('a day ago', () => {
        const now = dayjs('2021-01-01 00:35:00');
        const date = dayjs('2020-12-31 00:25:00');

        const actual = formatDate(date, now, options);

        expect(actual).toBe('A day ago');
    });

    test('5 days ago', () => {
        const now = dayjs('2021-01-06');
        const date = dayjs('2021-01-01');

        const actual = formatDate(date, now, options);

        expect(actual).toBe('5 days ago');
    });

    test('an hour ago', () => {
        const now = dayjs('2021-01-01 01:00:00');
        const date = dayjs('2021-01-01 00:00:00');

        const actual = formatDate(date, now, options);

        expect(actual).toBe('An hour ago');
    });

    test('5 hour ago', () => {
        const now = dayjs('2021-01-01 05:00:00');
        const date = dayjs('2021-01-01 00:00:00');

        const actual = formatDate(date, now, options);

        expect(actual).toBe('5 hours ago');
    });

    test('a minute ago', () => {
        const now = dayjs('2021-01-01 00:00:00');
        const date = dayjs('2020-12-31 23:59:00');

        const actual = formatDate(date, now, options);

        expect(actual).toBe('A minute ago');
    });

    test('25 minutes ago', () => {
        const now = dayjs('2021-01-01 00:25:00');
        const date = dayjs('2021-01-01 00:00:00');

        const actual = formatDate(date, now, options);

        expect(actual).toBe('25 minutes ago');
    });

    test('2022-01-01', () => {
        const now = dayjs('2022-01-01 00:25:00');
        const date = dayjs('2021-01-01 00:00:00');

        const actual = formatDate(date, now, options);

        expect(actual).toBe('2021-01-01');
    });

    test('future', () => {
        const now = dayjs('2022-01-01 00:25:00');
        const date = dayjs('2022-01-05 01:15:00');

        const actual = formatDate(date, now, options);

        expect(actual).toBe('2022-01-05');
    });
});

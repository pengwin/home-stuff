import dayjs from 'dayjs';

interface DateFormatterOptions {
    justNow: string;
    dateFormat: string;
    nDaysAgo: (n: number) => string;
    nHoursAgo: (n: number) => string;
    nMinutesAgo: (n: number) => string;
    nDaysAgoThreshold: number;
}

export function formatDate(
    date: dayjs.Dayjs,
    now: dayjs.Dayjs,
    options: DateFormatterOptions,
) {
    const daysDiff = now.diff(date, 'day');
    if (daysDiff < 0) {
        // future
        return date.format(options.dateFormat);
    }
    if (daysDiff > options.nDaysAgoThreshold) {
        return date.format(options.dateFormat);
    }
    if (daysDiff > 0) {
        return options.nDaysAgo(daysDiff);
    }

    const hoursDiff = now.diff(date, 'hour');
    if (hoursDiff < 0) {
        // future
        return date.format(options.dateFormat);
    }
    if (hoursDiff > 0) {
        return options.nHoursAgo(hoursDiff);
    }

    const minutesDiff = now.diff(date, 'minute');
    if (minutesDiff < 0) {
        // future
        return date.format(options.dateFormat);
    }
    if (minutesDiff > 0) {
        return options.nMinutesAgo(minutesDiff);
    }

    return options.justNow;
}

interface NumberFormatterOptions {
    locale: string;
    fractionDigits?: number;
    noShortcuts?: boolean;
}

export function numberFormatter(n: number, options: NumberFormatterOptions) {
    const numberFormat = new Intl.NumberFormat(options.locale, {
        style: 'decimal',
        maximumFractionDigits: options.fractionDigits,
    });

    const format = (n: number) => numberFormat.format(n);
    if (options.noShortcuts) {
        return format(n);
    }

    if (n > 1000000) {
        n = n / 1000000;
        return `${format(n)}M`;
    }

    if (n > 1000) {
        n = n / 1000;
        return `${format(n)}K`;
    }
    return format(n);
}

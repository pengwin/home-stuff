import { Spinner } from '~/components/spinner';

import { useI18n } from '~/locale';

export function ChartSpinner() {
    const [t] = useI18n();
    return (
        <div
            role="status"
            class="max-w-sm p-4 border border-none rounded shadow animate-pulse md:p-6 dark:border-gray-700"
        >
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5" />
            <div class="w-48 h-2 mb-10 bg-gray-200 rounded-full dark:bg-gray-700" />
            <div class="flex items-baseline mt-4 space-x-6">
                <div class="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700" />
                <div class="w-full h-56 bg-gray-200 rounded-t-lg dark:bg-gray-700" />
                <div class="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700" />
                <div class="w-full h-64 bg-gray-200 rounded-t-lg dark:bg-gray-700" />
                <div class="w-full bg-gray-200 rounded-t-lg h-80 dark:bg-gray-700" />
                <div class="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700" />
                <div class="w-full bg-gray-200 rounded-t-lg h-80 dark:bg-gray-700" />
            </div>
            <Spinner
                classNames="sr-only"
                text={t.components.chart.chartSpinner.text()}
            />
        </div>
    );
}

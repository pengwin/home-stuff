import { lazy, Suspense, createMemo } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import type { ChartProps, ChartComponentType } from './BaseChart';
import { ChartSpinner } from './ChartSpinner';

const loaders: Record<ChartComponentType, () => Promise<void>> = {
    bar: async () => {
        const mod = await import('./register-bar-chart');
        mod.default();
    },
    pie: async () => {
        const mod = await import('./register-pie-chart');
        mod.default();
    },
    doughnut: async () => {
        const mod = await import('./register-doughnut-chart');
        mod.default();
    },
};

async function loadChart(type: ChartComponentType) {
    const { BaseChart } = await import('./BaseChart');
    await loaders[type]();
    const chart = BaseChart(type);
    return { default: chart };
}

function _LazyChart(type: ChartComponentType) {
    return lazy(() => loadChart(type));
}

const LazyMap: Record<ChartComponentType, ReturnType<typeof _LazyChart>> = {
    bar: _LazyChart('bar'),
    doughnut: _LazyChart('doughnut'),
    pie: _LazyChart('pie'),
};

interface LazyChartProps extends ChartProps {
    type: ChartComponentType;
}

export function LazyChart(props: LazyChartProps) {
    const Chart = createMemo(() => LazyMap[props.type]);

    return (
        <Suspense fallback={<ChartSpinner />}>
            <Dynamic component={Chart()} {...props} />
        </Suspense>
    );
}

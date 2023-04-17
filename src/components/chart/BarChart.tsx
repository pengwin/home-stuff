import { onMount, onCleanup, createMemo, createEffect, on } from 'solid-js';
import {
    Chart,
    LinearScale,
    BarController,
    BarElement,
    DoughnutController,
    CategoryScale,
    Title,
    Tooltip,
} from 'chart.js';

Chart.register(
    LinearScale,
    BarController,
    CategoryScale,
    BarElement,
    Title,
    Tooltip,
    DoughnutController,
);

interface RgbColor {
    r: number;
    g: number;
    b: number;
}

function rgba(color?: RgbColor, a?: number) {
    return color
        ? `rgba(${color.r}, ${color.g}, ${color.b}, ${a || 1})`
        : undefined;
}

export interface BarChartData {
    label: () => string;
    value: number;
    color?: RgbColor;
    tooltipText?: string;
    onClick?: () => void;
}

interface BarChartProps {
    title: string;
    data: BarChartData[];
}

export default function BarChart(props: BarChartProps) {
    // eslint-disable-next-line prefer-const
    let ctx: HTMLCanvasElement | undefined = undefined;
    let chart: Chart | undefined;

    const labels = createMemo(() => props.data.map(d => d.label()));
    const values = createMemo(() => props.data.map(d => d.value));
    const backgroundColors = createMemo(() =>
        props.data.map(d => rgba(d.color, 0.5)),
    );
    const hoverBackgroundColor = createMemo(() =>
        props.data.map(d => rgba(d.color, 0.85)),
    );
    const borderColors = createMemo(() => props.data.map(d => rgba(d.color)));

    createEffect(
        on(labels, l => {
            if (!chart) return;
            chart.data.labels = l;
            chart.update();
        }),
    );
    createEffect(
        on(
            () => props.title,
            l => {
                if (!chart?.options.plugins?.title) return;
                chart.options.plugins.title.text = l;
                chart.update();
            },
        ),
    );
    createEffect(
        on(values, v => {
            if (!chart) return;
            chart.data.datasets[0].data = v;
            chart.update();
        }),
    );
    createEffect(
        on(backgroundColors, bc => {
            if (!chart) return;
            chart.data.datasets[0].backgroundColor = bc;
            chart.update();
        }),
    );
    createEffect(
        on(hoverBackgroundColor, hbc => {
            if (!chart) return;
            chart.data.datasets[0].hoverBackgroundColor = hbc;
            chart.update();
        }),
    );
    createEffect(
        on(borderColors, bc => {
            if (!chart) return;
            chart.data.datasets[0].borderColor = bc;
            chart.update();
        }),
    );

    onMount(() => {
        if (!ctx) throw new Error('ctx is undefined');

        const data = {
            labels: labels(),
            datasets: [
                {
                    data: values(),
                    backgroundColor: backgroundColors(),
                    borderColor: borderColors(),
                    hoverBackgroundColor: hoverBackgroundColor(),
                    borderWidth: 1,
                },
            ],
        };

        const options = {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
            onClick: (_event, elements) => {
                if (elements.length === 0) return;
                const barItem = props.data[elements[0].index];
                if (!barItem) return;
                barItem.onClick?.();
            },
            plugins: {
                title: {
                    display: true,
                    text: props.title,
                },
                tooltip: {
                    callbacks: {
                        label: context => {
                            const barItem = props.data[context.dataIndex];
                            if (!barItem) return;
                            return barItem.tooltipText;
                        },
                    },
                },
            },
        };

        const barConfig = {
            type: 'bar' as const,
            data,
            options,
        };

        chart = new Chart(ctx, barConfig);

        onCleanup(() => chart?.destroy());
    });

    return <canvas ref={ctx} />;
}

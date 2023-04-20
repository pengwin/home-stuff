import { onMount, onCleanup, createMemo, createEffect, on } from 'solid-js';
import { Chart } from 'chart.js';

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

export interface ChartData {
    label: () => string;
    value: number;
    color?: RgbColor;
    tooltipText?: string;
    onClick?: () => void;
}

interface ChartProps {
    title: string;
    data: ChartData[];
}

type ChartComponentType = 'bar' | 'doughnut' | 'pie';
type ChartType = Chart<ChartComponentType>;

export function BaseChart(chartComponentType: ChartComponentType) {
    return function ChartComponent(props: ChartProps) {
        const isLinearChart = chartComponentType === 'bar';
        const isRoundChart =
            chartComponentType === 'doughnut' || chartComponentType === 'pie';

        // eslint-disable-next-line prefer-const
        let ctx: HTMLCanvasElement | undefined = undefined;
        let chart: ChartType | undefined;

        const labels = createMemo(() => props.data.map(d => d.label()));
        const values = createMemo(() => props.data.map(d => d.value));
        const backgroundColors = createMemo(() =>
            props.data.map(d => rgba(d.color, 0.5)),
        );
        const hoverBackgroundColor = createMemo(() =>
            props.data.map(d => rgba(d.color, 0.85)),
        );
        const borderColors = createMemo(() =>
            props.data.map(d => rgba(d.color)),
        );

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
                scales: isLinearChart
                    ? {
                          y: {
                              beginAtZero: true,
                          },
                      }
                    : undefined,
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
                    legend: {
                        display: isRoundChart,
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

            const chartFactories: Record<
                ChartComponentType,
                (canvas: HTMLCanvasElement) => ChartType
            > = {
                doughnut: canvas => {
                    const doughnutConfig = {
                        type: 'doughnut' as const,
                        data,
                        options,
                    };
                    return new Chart({ canvas }, doughnutConfig);
                },
                bar: canvas => {
                    const barConfig = {
                        type: 'bar' as const,
                        data,
                        options,
                    };
                    return new Chart({ canvas }, barConfig);
                },
                pie: canvas => {
                    const pieConfig = {
                        type: 'pie' as const,
                        data,
                        options,
                    };
                    return new Chart({ canvas }, pieConfig);
                },
            };

            const factory = chartFactories[chartComponentType];
            if (!factory)
                throw new Error(`Unknown chart type: ${chartComponentType}`);
            if (!ctx) throw new Error('ctx is undefined');

            chart = factory(ctx);

            onCleanup(() => chart?.destroy());
        });

        return <canvas ref={ctx} />;
    };
}

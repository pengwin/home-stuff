import type { Component } from 'solid-js';
import { createStore } from 'solid-js/store';
import { BarChart, BarChartData } from '~/components/chart';

import { useI18n } from '~/locale';

const Index: Component = () => {
    const [t] = useI18n();
    const [getData, setData] = createStore([
        {
            label: () => t.pages.index.mainChart.labels.a(),
            value: 10,
            color: { r: 255, g: 99, b: 132 },
        },
        {
            label: () => t.pages.index.mainChart.labels.b(),
            value: 20,
            color: { r: 54, g: 162, b: 235 },
        },
        {
            label: () => t.pages.index.mainChart.labels.c(),
            value: 30,
            color: { r: 255, g: 205, b: 86 },
        },
    ] as BarChartData[]);

    const reGenerate = () => {
        /*setData({
            label: () => t.pages.index.mainChart.labels.a(),
            value: Math.floor(Math.random() * 100),
            color: { r: 255, g: 99, b: 132 },
        });
        setData({
            label: () => t.pages.index.mainChart.labels.b(),
            value: Math.floor(Math.random() * 100),
            color: { r: 54, g: 162, b: 235 },
        });
        setData({
            label: () => t.pages.index.mainChart.labels.c(),
            value: Math.floor(Math.random() * 100),
            color: { r: 255, g: 205, b: 86 },
        });*/

        const newData: BarChartData[] = [
            {
                label: () => t.pages.index.mainChart.labels.a(),
                value: Math.floor(Math.random() * 100),
                color: { r: 255, g: 99, b: 132 },
                onClick: () => {
                    // eslint-disable-next-line no-console
                    console.log('Click');
                },
            },
        ];
        const newLength = Math.floor(Math.random() * 15);
        for (let i = 0; i < newLength; i++) {
            const label = new Array(Math.floor(Math.random() * 10))
                .fill('a')
                .join('');
            const color = {
                r: Math.floor(Math.random() * 255),
                g: Math.floor(Math.random() * 255),
                b: Math.floor(Math.random() * 255),
            };
            newData.push({
                label: () => label,
                value: Math.floor(Math.random() * 10) * 10,
                tooltipText: `Tooltip for ${label}`,
                color,
            });
        }

        setData(newData);
    };

    return (
        <div>
            <BarChart title={t.pages.index.mainChart.title()} data={getData} />
            <button class="btn" onClick={reGenerate}>
                {t.pages.index.regenerateBtn()}
            </button>
        </div>
    );
};

export default Index;

import { Component, createMemo, createSignal, For } from 'solid-js';
import dayjs from 'dayjs';
import { createStore } from 'solid-js/store';

import { LazyChart, ChartData, ChartComponentType } from '~/components/chart';
import { Table } from '~/components/table';

import { useI18n } from '~/locale';
import { HeaderTitle } from '~/components/table/HeaderTitle';
import { SortOrder } from '~/components/table/table-context';

interface Expense {
    category: string;
    amount: number;
    date: dayjs.Dayjs;
    detail: string;
}

const Index: Component = () => {
    const [t] = useI18n();

    function randomDate() {
        return dayjs().add(Math.floor(Math.random() * 100000), 'minutes');
    }

    const [data, setData] = createStore<Expense[]>([
        {
            category: 'Food',
            amount: 100,
            date: dayjs().add(-1, 'day').add(2, 'hour').add(30, 'minute'),
            detail: 'Bought some meat',
        },
        {
            category: 'Food',
            amount: 20,
            date: dayjs().add(-1, 'hour').add(3, 'hour').add(19, 'minute'),
            detail: 'Bought some vegetables',
        },
        {
            category: 'Food',
            amount: 1200,
            date: dayjs().add(-1, 'hour').add(3, 'hour').add(19, 'minute'),
            detail: 'Bought some vegetables',
        },
        {
            category: 'Car',
            amount: 300,
            date: dayjs().add(1, 'day').add(7, 'hour').add(13, 'minute'),
            detail: 'Bought a car part',
        },
        {
            category: 'Car',
            amount: 5325,
            date: dayjs().add(1, 'day').add(7, 'hour').add(13, 'minute'),
            detail: 'Bought a car part',
        },
        {
            category: 'Utilities',
            amount: 100,
            date: dayjs().add(5, 'day').add(8, 'hour').add(-20, 'minute'),
            detail: 'Paid for electricity',
        },
        {
            category: 'Utilities',
            amount: 50,
            date: dayjs().add(-2, 'day').add(5, 'hour').add(-13, 'minute'),
            detail: 'Paid for water',
        },
        {
            category: 'Utilities',
            amount: 2450,
            date: dayjs().add(-2, 'day').add(5, 'hour').add(-13, 'minute'),
            detail: 'Paid for water',
        },
    ]);

    const [selectedCategory, setSelectedCategory] = createSignal<string | null>(
        null,
    );

    const selectedData = createMemo<Expense[]>(() => {
        const cat = selectedCategory();
        if (cat === null) {
            return data;
        }
        return data.filter(x => x.category === selectedCategory());
    });

    function createSelectCategoryHandler(category: string | null) {
        // eslint-disable-next-line solid/reactivity
        return function toggleSelectedCategory() {
            if (selectedCategory() === category) {
                setSelectedCategory(null);
                return;
            }
            setSelectedCategory(category);
        };
    }

    const getChartData = createMemo<ChartData[]>(() =>
        Object.entries(
            data.reduce(
                (acc, expense) => {
                    if (acc[expense.category]) {
                        acc[expense.category].amount += expense.amount;
                    } else {
                        acc[expense.category] = {
                            amount: expense.amount,
                        };
                    }
                    return acc;
                },
                {} as Record<string, { amount: number }>,
            ),
        ).map(x => {
            const [label, { amount }] = x;
            const color = {
                r: Math.floor(Math.random() * 255),
                g: Math.floor(Math.random() * 255),
                b: Math.floor(Math.random() * 255),
            };
            return {
                label: () => label,
                value: amount,
                tooltipText: `Tooltip for ${label}`,
                color,
                onClick: createSelectCategoryHandler(label),
            };
        }),
    );

    const [chartType, setChartType] = createSignal<ChartComponentType>('bar');

    const reGenerate = () => {
        const newData: Expense[] = [];
        const newLength = Math.floor(Math.random() * 15);
        for (let i = 0; i < newLength; i++) {
            const category = new Array(Math.floor(Math.random() * 10))
                .fill('a')
                .join('');
            newData.push({
                category,
                amount: Math.floor(Math.random() * 10000),
                date: randomDate(),
                detail: `Bought ${category.toLowerCase()}`,
            });
        }

        setData(newData);
    };

    const changeChartType = (e: Event) => {
        const target = e.target as HTMLSelectElement;
        setChartType(target.value as ChartComponentType);
    };

    const chartOptionsMap: Record<
        ChartComponentType,
        { text: string; selected: boolean }
    > = {
        bar: { text: 'Bar', selected: true },
        doughnut: { text: 'Doughnut', selected: false },
        pie: { text: 'Pie', selected: false },
    };

    const chartOptions = Object.entries(chartOptionsMap).map(([key, value]) => {
        return {
            value: key,
            text: value.text,
            selected: value.selected,
        };
    });

    const [getSortBy, setSortBy] = createSignal<string | undefined>();
    const [getSortOrder, setSortOrder] = createSignal<SortOrder | undefined>();

    const flipSort = (id: string) => {
        let sortOrder = getSortOrder();
        if (getSortBy() !== id) {
            setSortBy(id);
            sortOrder = undefined;
        }
        if (sortOrder === undefined) {
            setSortOrder('asc');
        } else if (sortOrder === 'asc') {
            setSortOrder('desc');
        } else if (sortOrder === 'desc') {
            setSortOrder(undefined);
        }
    };

    const sortOrderById = (id: string) => {
        if (getSortBy() !== id) {
            return;
        }

        return getSortOrder;
    };

    return (
        <div>
            <select
                class="select select-bordered select-xs max-w-xs"
                onChange={changeChartType}
            >
                <For each={chartOptions}>
                    {item => (
                        <option selected={item.selected} value={item.value}>
                            {item.text}
                        </option>
                    )}
                </For>
            </select>
            <LazyChart
                type={chartType()}
                title={t.pages.index.mainChart.title()}
                data={getChartData()}
            />
            <button class="btn" onClick={reGenerate}>
                {t.pages.index.regenerateBtn()}
            </button>
            <Table
                data={selectedData()}
                sortOrder={getSortOrder()}
                sortBy={getSortBy()}
                header={(id, title) => (
                    <HeaderTitle
                        title={title}
                        sortOrder={sortOrderById(id)}
                        sortHandler={() => flipSort(id)}
                    />
                )}
            >
                {ctx => (
                    <>
                        <ctx.StringColumn
                            id="category"
                            title={t.pages.index.table.category}
                            accessorFn={t => t.category}
                        />
                        <ctx.NumberColumn
                            id="amount"
                            title={t.pages.index.table.amount}
                            accessorFn={t => t.amount}
                        />
                        <ctx.DateColumn
                            id="date"
                            title={t.pages.index.table.date}
                            accessorFn={t => t.date}
                        />
                        <ctx.StringColumn
                            id="detail"
                            title={t.pages.index.table.detail}
                            accessorFn={t => t.detail}
                        />
                    </>
                )}
            </Table>
        </div>
    );
};

export default Index;

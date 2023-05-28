import { Component, createSignal, For } from 'solid-js';
import dayjs from 'dayjs';
import { createStore } from 'solid-js/store';

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

interface Column {
    id: string;
    title: () => string;
    accessorFn: (t: Expense) => number;
}

function randomDate() {
    return dayjs().add(Math.floor(Math.random() * 100000), 'minutes');
}

const TablePerf: Component = () => {
    const [t] = useI18n();

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

    const [columns, setColumns] = createStore<Column[]>([
        {
            id: 'Column1',
            title: () => 'Column1',
            accessorFn: _ => 1024,
        },
    ]);

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

    const reGenerate = () => {
        const dimentions = 100;
        const newColumnsCount = Math.floor(Math.random() * dimentions);
        const newColumns: Column[] = [];
        for (let i = 0; i < newColumnsCount; i++) {
            newColumns.push({
                id: `Column${i}`,
                title: () => `Column ${i}`,
                accessorFn: t => t.amount + Math.random() * 1000,
            });
        }
        setColumns(newColumns);

        const newData: Expense[] = [];
        const newLength = Math.floor(Math.random() * dimentions);
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

    return (
        <div>
            <button class="btn" onClick={reGenerate}>
                {t.pages.test.tablePerf.regenerateBtn()}
            </button>
            <Table
                data={data}
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
                    <For each={columns}>
                        {c => (
                            <ctx.NumberColumn
                                id={c.id}
                                title={c.title}
                                accessorFn={c.accessorFn}
                            />
                        )}
                    </For>
                )}
            </Table>
        </div>
    );
};

export default TablePerf;

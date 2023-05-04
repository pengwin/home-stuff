import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    createSolidTable,
    HeaderGroup,
    Header,
    Row,
    Cell,
    SortingState,
} from '@tanstack/solid-table';

import { For, Show, createMemo, createSignal } from 'solid-js';
import { GridDescription } from './grid-description';

function HeaderTitle<T, V>(props: { header: Header<T, V> }) {
    const sortingText = createMemo(() => {
        const sorted = props.header.column.getIsSorted();
        if (sorted === 'asc') {
            return '▲';
        } else if (sorted === 'desc') {
            return '▼';
        }
    });

    const sortingHandler = createMemo(() =>
        props.header.column.getToggleSortingHandler(),
    );
    const onClick = e => {
        const handler = sortingHandler();
        if (handler) {
            handler(e);
        }
    };

    return (
        // eslint-disable-next-line solid/reactivity
        <span class="select-none cursor-pointer" onClick={onClick}>
            {flexRender(
                props.header.column.columnDef.header,
                props.header.getContext(),
            )}{' '}
            {sortingText()}
        </span>
    );
}

function HeaderComponent<T, V>(props: { header: Header<T, V> }) {
    return (
        <th colSpan={props.header.colSpan}>
            <Show when={!props.header.isPlaceholder}>
                <HeaderTitle header={props.header} />
            </Show>
        </th>
    );
}

function HeaderGroupComponent<T>(props: { headerGroup: HeaderGroup<T> }) {
    return (
        <tr>
            <For each={props.headerGroup.headers}>
                {header => <HeaderComponent header={header} />}
            </For>
        </tr>
    );
}

function RowComponent<T>(props: { row: Row<T> }) {
    return (
        <tr>
            <For each={props.row.getVisibleCells()}>
                {cell => <CellComponent cell={cell} />}
            </For>
        </tr>
    );
}

function CellComponent<T, V>(props: { cell: Cell<T, V> }) {
    return (
        <td>
            {flexRender(
                props.cell.column.columnDef.cell,
                props.cell.getContext(),
            )}
        </td>
    );
}

interface TableProps<T> {
    data: T[];
    description: GridDescription<T>;
}

export function Grid<T>(props: TableProps<T>) {
    const [sorting, setSorting] = createSignal<SortingState>([]);
    const columnDefs = createMemo(() => props.description.toColumnDefs());
    const table = createSolidTable({
        get data() {
            return props.data;
        },
        columns: columnDefs(),
        state: {
            get sorting() {
                return sorting();
            },
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <table class="table table-compact w-full">
            <thead>
                <For each={table.getHeaderGroups()}>
                    {headerGroup => (
                        <HeaderGroupComponent headerGroup={headerGroup} />
                    )}
                </For>
            </thead>
            <tbody>
                <For each={table.getRowModel().rows}>
                    {row => <RowComponent row={row} />}
                </For>
            </tbody>
        </table>
    );
}

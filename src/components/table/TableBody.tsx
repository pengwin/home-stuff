import { For } from 'solid-js';

import { ColumnDef } from './table-context';

interface TableCellProps<T> {
    def: ColumnDef<T>;
    data: T;
}

function TableCell<T>(props: TableCellProps<T>) {
    return <td>{props.def.value(props.data)}</td>;
}

interface TableRowProps<T> {
    data: T;
    columns: ReadonlyArray<ColumnDef<T>>;
}

function TableRow<T>(props: TableRowProps<T>) {
    return (
        <tr>
            <For each={props.columns}>
                {def => <TableCell def={def} data={props.data} />}
            </For>
        </tr>
    );
}

interface TableBodyProps<T> {
    data: T[];
    columns: ReadonlyArray<ColumnDef<T>>;
}

export function TableBody<T>(props: TableBodyProps<T>) {
    return (
        <tbody>
            <For each={props.data}>
                {t => <TableRow data={t} columns={props.columns} />}
            </For>
        </tbody>
    );
}

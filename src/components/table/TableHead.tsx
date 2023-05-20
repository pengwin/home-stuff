import { For } from 'solid-js';

import { ColumnDef } from './table-context';

interface TheadProps<T> {
    def: ColumnDef<T>;
}

function Thead<T>(props: TheadProps<T>) {
    return <th>{props.def.header()}</th>;
}

interface TableHeadProps<T> {
    columns: ReadonlyArray<ColumnDef<T>>;
}

export function TableHead<T>(props: TableHeadProps<T>) {
    return (
        <thead>
            <For each={props.columns}>{def => <Thead def={def} />}</For>
        </thead>
    );
}

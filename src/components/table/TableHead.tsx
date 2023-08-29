import { For, createMemo } from 'solid-js';

import { ColumnDef, HeaderFactory } from './table-context';

interface TheadProps<T> {
    def: ColumnDef<T>;
    header: HeaderFactory;
}

function Thead<T>(props: TheadProps<T>) {
    const header = createMemo(() =>
        props.header(props.def.id(), props.def.title),
    );

    return <th>{header()}</th>;
}

interface TableHeadProps<T> {
    columns: ReadonlyArray<ColumnDef<T>>;
    header: HeaderFactory;
}

export function TableHead<T>(props: TableHeadProps<T>) {
    return (
        <thead>
            <tr>
                <For each={props.columns}>
                    {def => <Thead def={def} header={props.header} />}
                </For>
            </tr>
        </thead>
    );
}

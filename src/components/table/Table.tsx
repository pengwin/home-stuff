import { JSX, children } from 'solid-js';
import { createStore } from 'solid-js/store';

import { ColumnDef, TableContext, TableContextImpl } from './table-context';
import { TableHead } from './TableHead';
import { TableBody } from './TableBody';

interface TableInnerProps<T> {
    data: T[];
    columns: ReadonlyArray<ColumnDef<T>>;
}

function TableInner<T>(props: TableInnerProps<T>) {
    return (
        <>
            <TableHead columns={props.columns} />
            <TableBody columns={props.columns} data={props.data} />
        </>
    );
}

interface TableProps<T, U extends JSX.Element> {
    data: T[];
    children: (ctx: TableContext<T>) => U;
}

export function Table<T, U extends JSX.Element>(props: TableProps<T, U>) {
    const [columns, setColumns] = createStore<ColumnDef<T>[]>([]);

    const ctx: TableContext<T> = new TableContextImpl(setColumns);

    const c = children(() => {
        props.children(ctx);
        return <TableInner data={props.data} columns={columns} />;
    });

    return <table class="table table-compact w-full">{c()}</table>;
}

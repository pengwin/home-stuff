import { JSX, children, createMemo } from 'solid-js';
import { createStore } from 'solid-js/store';

import {
    ColumnDef,
    TableContext,
    TableContextImpl,
    HeaderFactory,
    SortOrder,
} from './table-context';
import { TableHead } from './TableHead';
import { TableBody } from './TableBody';

interface TableInnerProps<T> {
    data: T[];
    header: HeaderFactory;
    columns: ReadonlyArray<ColumnDef<T>>;
}

function TableInner<T>(props: TableInnerProps<T>) {
    return (
        <>
            <TableHead columns={props.columns} header={props.header} />
            <TableBody columns={props.columns} data={props.data} />
        </>
    );
}

interface TableProps<T, U extends JSX.Element> {
    data: T[];
    header?: HeaderFactory;
    sortOrder?: SortOrder;
    sortBy?: string;
    children: (ctx: TableContext<T>) => U;
}

const defaultHeader: HeaderFactory = (_, title) => <>{title()}</>;

export function Table<T, U extends JSX.Element>(props: TableProps<T, U>) {
    const [columns, setColumns] = createStore<ColumnDef<T>[]>([]);

    const ctx: TableContext<T> = new TableContextImpl(setColumns);

    const header = createMemo(() => props.header ?? defaultHeader);

    const sortedData = createMemo(() => {
        const data = props.data;
        const order = props.sortOrder;
        if (order === undefined) {
            return data;
        }
        const sortBy = props.sortBy;
        if (!sortBy) {
            return data;
        }
        const def = columns.find(x => x.id() === sortBy);
        if (!def) {
            return data;
        }

        const result = [...data];
        def.sortFn(result, order);
        return result;
    });

    const c = children(() => {
        props.children(ctx);
        return (
            <TableInner
                data={sortedData()}
                columns={columns}
                header={header()}
            />
        );
    });

    return <table class="table table-compact w-full">{c()}</table>;
}

import {
    Accessor,
    For,
    JSX,
    children,
    createEffect,
    onCleanup,
} from 'solid-js';
import { createStore, produce, SetStoreFunction } from 'solid-js/store';

interface TableContext<T> {
    set(id: string, columnDef: ColumnDef<T>): void;
    remove(id: string): void;
}

class TableContextImpl<T> implements TableContext<T> {
    constructor(
        private readonly setColumns: SetStoreFunction<ColumnDef<T>[]>,
    ) {}

    set(id: string, columnDef: ColumnDef<T>): void {
        this.setColumns(
            produce((columns: ColumnDef<T>[]) => {
                const index = columns.findIndex(c => c.id() === id);
                if (index >= 0) {
                    columns[index] = columnDef;
                    return;
                }
                columns.push(columnDef);
                return;
            }),
        );
    }
    remove(id: string): void {
        this.setColumns(
            produce((columns: ColumnDef<T>[]) => {
                const index = columns.findIndex(c => c.id() === id);
                if (index !== -1) {
                    return;
                }
                columns.splice(index, 1);
            }),
        );
    }
}

interface ColumnDef<T> {
    id: Accessor<string>;
    header: Accessor<string>;
    value: (i: T) => JSX.Element;
}

type AccessorFn<T, TValue> = (x: T) => TValue;

export interface ColumnProps<T, TValue> {
    id: string;
    accessorFn: AccessorFn<T, TValue>;
    valueRender: (accessor: Accessor<TValue>) => JSX.Element;
    header: Accessor<string>;
    ctx: TableContext<T>;
}

export function Column<T, TValue>(props: ColumnProps<T, TValue>) {
    createEffect(() => {
        const def: ColumnDef<T> = {
            id: () => props.id,
            header: () => props.header(),
            value: t => <>{props.valueRender(() => props.accessorFn(t))}</>,
        };
        props.ctx.set(props.id, def);
    });

    onCleanup(() => {
        props.ctx.remove(props.id);
    });

    return <></>;
}

interface TableProps<T, U extends JSX.Element> {
    //children: (context: FormContext) => U;
    data: T[];
    children: (ctx: TableContext<T>) => U;
}

interface TableHeadProps<T> {
    columns: ReadonlyArray<ColumnDef<T>>;
}

function TableHead<T>(props: TableHeadProps<T>) {
    return (
        <thead>
            <For each={props.columns}>{def => <th>{def.header()}</th>}</For>
        </thead>
    );
}

interface TableBodyProps<T> {
    data: T[];
    columns: ReadonlyArray<ColumnDef<T>>;
}

function TableBody<T>(props: TableBodyProps<T>) {
    return (
        <tbody>
            <For each={props.data}>
                {t => (
                    <tr>
                        <For each={props.columns}>
                            {def => <td>{def.value(t)}</td>}
                        </For>
                    </tr>
                )}
            </For>
        </tbody>
    );
}

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

export function Table<T, U extends JSX.Element>(props: TableProps<T, U>) {
    const [columns, setColumns] = createStore<ColumnDef<T>[]>([]);

    const ctx: TableContext<T> = new TableContextImpl(setColumns);

    const c = children(() => {
        props.children(ctx);
        return <TableInner data={props.data} columns={columns} />;
    });

    return <table class="table table-compact w-full">{c()}</table>;
}

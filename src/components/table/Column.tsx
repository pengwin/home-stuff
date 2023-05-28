import { Accessor, JSX, createEffect, onCleanup } from 'solid-js';

import { ColumnDef, SortFn, SortOrder, TableContext } from './table-context';

type AccessorFn<T, TValue> = (x: T) => TValue;

export interface ColumnProps<T, TValue> {
    id: string;
    accessorFn: AccessorFn<T, TValue>;
    valueRender: (accessor: Accessor<TValue>) => JSX.Element;
    title: Accessor<string | JSX.Element>;
    sortFn: (a: TValue, b: TValue, order: SortOrder) => number;
    ctx: TableContext<T>;
}

export function Column<T, TValue>(props: ColumnProps<T, TValue>) {
    createEffect(() => {
        const sortItemsFn = (a: T, b: T, order: SortOrder) => {
            const tA = props.accessorFn(a);
            const tB = props.accessorFn(b);
            return props.sortFn(tA, tB, order);
        };

        const sortFn: SortFn<T> = (s, o) => {
            // eslint-disable-next-line solid/reactivity
            s.sort((a, b) => sortItemsFn(a, b, o));
        };

        const def: ColumnDef<T> = {
            id: () => props.id,
            title: () => props.title(),
            value: t => <>{props.valueRender(() => props.accessorFn(t))}</>,
            sortFn,
        };
        props.ctx.set(props.id, def);
    });

    onCleanup(() => {
        props.ctx.remove(props.id);
    });

    return <></>;
}

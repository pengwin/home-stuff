import { Accessor, JSX, createEffect, onCleanup } from 'solid-js';

import { ColumnDef, TableContext } from './table-context';

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

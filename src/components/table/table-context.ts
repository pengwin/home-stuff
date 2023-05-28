import { Accessor, JSX } from 'solid-js';

export type SortOrder = 'asc' | 'desc';

export type SortFn<T> = (s: Array<T>, order: SortOrder) => void;

export type HeaderFactory = (
    id: string,
    title: Accessor<string | JSX.Element>,
) => JSX.Element;

export interface ColumnDef<T> {
    id: Accessor<string>;
    title: Accessor<string | JSX.Element>;
    value: (i: T) => JSX.Element;
    sortFn: SortFn<T>;
}

export interface TableContext<T> {
    set(id: string, columnDef: ColumnDef<T>): void;
    remove(id: string): void;
}

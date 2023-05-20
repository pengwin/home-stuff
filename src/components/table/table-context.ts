import { Accessor, JSX } from 'solid-js';
import { produce, SetStoreFunction } from 'solid-js/store';

export interface ColumnDef<T> {
    id: Accessor<string>;
    header: Accessor<string | JSX.Element>;
    value: (i: T) => JSX.Element;
}

export interface TableContext<T> {
    set(id: string, columnDef: ColumnDef<T>): void;
    remove(id: string): void;
}

export class TableContextImpl<T> implements TableContext<T> {
    constructor(
        private readonly setColumns: SetStoreFunction<ColumnDef<T>[]>,
    ) {}

    set(id: string, columnDef: ColumnDef<T>) {
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

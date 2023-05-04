import { CellContext, ColumnDef } from '@tanstack/solid-table';
import type { JSX } from 'solid-js/jsx-runtime';

export interface ColumnDescription<T> {
    toColumnDef(defaultId: string, defaultAccessor: string): ColumnDef<T>;
}

type AccessorFn<T, TValue> = (x: T) => TValue;

export interface BaseColumnDescriptionOptions<T, TValue> {
    id?: string;
    accessorFn?: AccessorFn<T, TValue>;
    columnHeader?: string;
    cellComponent?: (info: CellContext<T, TValue>) => JSX.Element;
}

export abstract class BaseColumnDescription<T, TValue = unknown>
    implements ColumnDescription<T>
{
    private readonly options: BaseColumnDescriptionOptions<T, TValue>;

    constructor(options?: BaseColumnDescriptionOptions<T, TValue>) {
        this.options = options ?? {};
    }

    private cellComponent(info: CellContext<T, TValue>): JSX.Element {
        if (this.options.cellComponent) return this.options.cellComponent(info);
        return this.defaultCellComponent(info);
    }

    protected abstract defaultCellComponent(
        info: CellContext<T, TValue>,
    ): JSX.Element;

    public get id(): string | undefined {
        return this.options.id;
    }

    public toColumnDef(
        defaultId: string,
        defaultAccessorKey: string,
    ): ColumnDef<T, TValue> {
        let defaultColumnHeader = defaultAccessorKey;
        defaultColumnHeader =
            defaultColumnHeader.charAt(0).toUpperCase() +
            defaultColumnHeader.slice(1);

        return {
            accessorFn: this.options.accessorFn,
            accessorKey: this.options.accessorFn
                ? undefined
                : defaultAccessorKey,
            id: this.options.id ?? defaultId,
            cell: info => this.cellComponent(info),
            header: () => this.options?.columnHeader ?? defaultColumnHeader,
        };
    }
}

export type GridDescriptionMap<T, K extends keyof T> = {
    [key in K]: ColumnDescription<T>;
};

export class GridDescription<T> {
    constructor(private readonly description: GridDescriptionMap<T, keyof T>) {}

    public toColumnDefs(): ColumnDef<T>[] {
        const keys = Object.keys(this.description);
        return keys.map(k => {
            const column = this.description[k as keyof T];
            return column.toColumnDef(k, k);
        });
    }
}

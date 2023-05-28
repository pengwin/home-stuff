import { SetStoreFunction, produce } from 'solid-js/store';
import { ColumnDef } from './table-context';
import {
    DateColumnPropsWoContext,
    NumberColumnPropsWoContext,
    StringColumnPropsWoContext,
    TableContextWithColumns,
} from './table-context-with-columns';
import { Component } from 'solid-js';
import { NumberColumn } from './cell-components/NumberCell';
import { DateColumn } from './cell-components/DateCell';
import { StringColumn } from './cell-components/StringCell';

export class TableContextImpl<T> implements TableContextWithColumns<T> {
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
            }),
        );
    }
    remove(id: string): void {
        this.setColumns(
            produce((columns: ColumnDef<T>[]) => {
                const index = columns.findIndex(c => c.id() === id);
                if (index === -1) {
                    return;
                }
                columns.splice(index, 1);
            }),
        );
    }

    get NumberColumn(): Component<NumberColumnPropsWoContext<T>> {
        const NumberColumnWoContext = (
            props: NumberColumnPropsWoContext<T>,
        ) => {
            return <NumberColumn {...props} ctx={this} />;
        };
        return NumberColumnWoContext;
    }

    get DateColumn(): Component<DateColumnPropsWoContext<T>> {
        const DateColumnWoContext = (props: DateColumnPropsWoContext<T>) => {
            return <DateColumn {...props} ctx={this} />;
        };
        return DateColumnWoContext;
    }

    get StringColumn(): Component<StringColumnPropsWoContext<T>> {
        const StringColumnWoContext = (
            props: StringColumnPropsWoContext<T>,
        ) => {
            return <StringColumn {...props} ctx={this} />;
        };
        return StringColumnWoContext;
    }
}

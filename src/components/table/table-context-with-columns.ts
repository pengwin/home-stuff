import { Component } from 'solid-js';
import { TableContext } from './table-context';
import { NumberColumnProps } from './cell-components/NumberCell';
import { DateColumnProps } from './cell-components/DateCell';
import { StringColumnProps } from './cell-components/StringCell';

export type NumberColumnPropsWoContext<T> = Omit<NumberColumnProps<T>, 'ctx'>;
export type DateColumnPropsWoContext<T> = Omit<DateColumnProps<T>, 'ctx'>;
export type StringColumnPropsWoContext<T> = Omit<StringColumnProps<T>, 'ctx'>;

export interface TableContextWithColumns<T> extends TableContext<T> {
    get NumberColumn(): Component<NumberColumnPropsWoContext<T>>;
    get DateColumn(): Component<DateColumnPropsWoContext<T>>;
    get StringColumn(): Component<StringColumnPropsWoContext<T>>;
}

import { CellContext } from '@tanstack/solid-table';
import { JSX } from 'solid-js/jsx-runtime';

import { BaseColumnDescription } from './grid-description';
import { StringCell } from './cell-components/StringCell';

export class StringColumnDescription<T> extends BaseColumnDescription<
    T,
    string
> {
    protected defaultCellComponent(info: CellContext<T, string>): JSX.Element {
        return StringCell(info)();
    }
}

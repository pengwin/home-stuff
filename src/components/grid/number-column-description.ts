import { CellContext } from '@tanstack/solid-table';
import { JSX } from 'solid-js/jsx-runtime';

import { BaseColumnDescription } from './grid-description';
import { NumberCell } from './cell-components/NumberCell';

export class NumberColumnDescription<T> extends BaseColumnDescription<
    T,
    number
> {
    protected defaultCellComponent(info: CellContext<T, number>): JSX.Element {
        return NumberCell(info)();
    }
}

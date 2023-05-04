import { CellContext } from '@tanstack/solid-table';
import { JSX } from 'solid-js/jsx-runtime';
import dayjs from 'dayjs';

import {
    BaseColumnDescription,
    BaseColumnDescriptionOptions,
} from './grid-description';
import { DateCell } from './cell-components/DateCell';

export class DateColumnDescription<T> extends BaseColumnDescription<
    T,
    dayjs.Dayjs
> {
    constructor(
        options?: BaseColumnDescriptionOptions<T, dayjs.Dayjs>,
        private readonly dateFormat?: string,
    ) {
        super(options);
    }

    protected defaultCellComponent(
        info: CellContext<T, dayjs.Dayjs>,
    ): JSX.Element {
        return DateCell(info, this.dateFormat)();
    }
}

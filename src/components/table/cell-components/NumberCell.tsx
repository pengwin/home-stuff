import { Accessor, createMemo } from 'solid-js';

import { useI18n } from '~/locale';
import { numberFormatter } from './number-formatter';

import { Column, ColumnProps } from '../Column';
import { SortOrder } from '../table-context';

function NumberCell(props: { value: Accessor<number> }) {
    const [t] = useI18n();

    const formattedValue = createMemo(() => {
        const value = props.value();
        if (value === undefined || value === null) {
            return 'N/A';
        }

        const locale =
            t.components.grid.cellComponents.num.numberFormatLocale();
        return numberFormatter(value, {
            locale,
            fractionDigits: 2,
        });
    });

    const fullValue = createMemo(() => {
        const value = props.value();
        if (value === undefined || value === null) {
            return '';
        }

        const locale =
            t.components.grid.cellComponents.num.numberFormatLocale();
        return numberFormatter(value, {
            locale,
            noShortcuts: true,
        });
    });

    return (
        <div class="tooltip" data-tip={fullValue()}>
            <i>{formattedValue()}</i>
        </div>
    );
}

export interface NumberColumnProps<T>
    extends Omit<ColumnProps<T, number>, 'valueRender' | 'sortFn'> {
    dateFormat?: string;
}

function sort(a: number, b: number, order: SortOrder) {
    return order === 'asc' ? a - b : b - a;
}

export function NumberColumn<T>(props: NumberColumnProps<T>) {
    return (
        <Column<T, number>
            {...props}
            sortFn={sort}
            valueRender={a => <NumberCell value={a} />}
        />
    );
}

import { Accessor } from 'solid-js';

import { Column, ColumnProps } from '../Column';
import { SortOrder } from '../table-context';

function StringCell(props: { value: Accessor<string> }) {
    return <span>{props.value()}</span>;
}

export interface StringColumnProps<T>
    extends Omit<ColumnProps<T, string>, 'valueRender' | 'sortFn'> {
    dateFormat?: string;
}

function sort(a: string, b: string, order: SortOrder) {
    return order === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
}

export function StringColumn<T>(props: StringColumnProps<T>) {
    return (
        <Column<T, string>
            {...props}
            sortFn={sort}
            valueRender={a => <StringCell value={a} />}
        />
    );
}

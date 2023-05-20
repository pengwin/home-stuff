import { Accessor } from 'solid-js';
import { Column, ColumnProps } from '../Table';

function StringCell(props: { value: Accessor<string> }) {
    return <span>{props.value()}</span>;
}

export interface StringColumnProps<T>
    extends Omit<ColumnProps<T, string>, 'valueRender'> {
    dateFormat?: string;
}

export function StringColumn<T>(props: StringColumnProps<T>) {
    return (
        <Column<T, string>
            {...props}
            valueRender={a => <StringCell value={a} />}
        />
    );
}

import { CellContext } from '@tanstack/solid-table';
import type { JSX } from 'solid-js/jsx-runtime';

function StringCellComponent(props: { value: string }) {
    return <span>{props.value}</span>;
}

export function StringCell<T>(info: CellContext<T, string>): () => JSX.Element {
    return function _NumberCellComponent() {
        return <StringCellComponent value={info.getValue()} />;
    };
}

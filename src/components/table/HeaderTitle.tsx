import { Accessor, JSX, createMemo } from 'solid-js';
import { SortOrder } from './table-context';

interface HeaderTitleProps {
    title: Accessor<string | JSX.Element>;
    sortHandler?: () => void;
    sortOrder?: Accessor<SortOrder | undefined>;
}

export function HeaderTitle(props: HeaderTitleProps) {
    const classes = createMemo(() => {
        const sortHandler = props.sortHandler;
        if (!sortHandler) {
            return '';
        }
        return 'cursor-pointer select-none';
    });

    const onClick = () => {
        const sortHandler = props.sortHandler;
        if (!sortHandler) {
            return;
        }
        sortHandler();
    };

    const sortOrder = createMemo(() => {
        if (!props.sortOrder) {
            return;
        }

        const sortOrder = props.sortOrder();
        if (sortOrder === 'asc') {
            return '↓';
        }

        if (sortOrder === 'desc') {
            return '↑';
        }

        return '';
    });

    return (
        <span class={classes()} onClick={_ => onClick()}>
            {props.title()}
            {sortOrder()}
        </span>
    );
}

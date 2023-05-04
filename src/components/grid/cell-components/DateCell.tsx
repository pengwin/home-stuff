import { CellContext } from '@tanstack/solid-table';
import type { JSX } from 'solid-js/jsx-runtime';
import dayjs from 'dayjs';
import { Accessor, createMemo } from 'solid-js';

import { useI18n } from '~/locale';

import { formatDate } from './date-formatter';

function DateCellComponent(props: {
    value: Accessor<dayjs.Dayjs>;
    dateFormat?: string;
}) {
    const [t] = useI18n();

    const formattedValue = createMemo(() => {
        const value = props.value();
        if (value === undefined || value === null) {
            return '';
        }

        const dateFormat =
            props.dateFormat ??
            t.components.grid.cellComponents.date.dateFormat();

        const options = {
            dateFormat,
            justNow: t.components.grid.cellComponents.date.justNow(),
            nMinutesAgo: t.components.grid.cellComponents.date.nMinutesAgo,
            nHoursAgo: t.components.grid.cellComponents.date.nHoursAgo,
            nDaysAgo: t.components.grid.cellComponents.date.nDaysAgo,
            nDaysAgoThreshold: 3,
        };
        const now = dayjs();
        return formatDate(value, now, options);
    });

    const fullValue = createMemo(() => {
        const value = props.value();
        if (value === undefined || value === null) {
            return '';
        }

        return value.format(t.components.grid.cellComponents.date.fullFormat());
    });

    return (
        <div class="tooltip" data-tip={fullValue()}>
            <i>{formattedValue()}</i>
        </div>
    );
}

export function DateCell<T>(
    info: CellContext<T, dayjs.Dayjs>,
    dateFormat?: string,
): () => JSX.Element {
    return function _DateCellComponent() {
        const getValue = () => info.getValue();
        return <DateCellComponent value={getValue} dateFormat={dateFormat} />;
    };
}

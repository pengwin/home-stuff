import dayjs from 'dayjs';
import { Accessor, createMemo } from 'solid-js';

import { useI18n } from '~/locale';

import { formatDate } from './date-formatter';

import { Column, ColumnProps } from '../Table';

function DateCell(props: {
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

export interface DateColumnProps<T>
    extends Omit<ColumnProps<T, dayjs.Dayjs>, 'valueRender'> {
    dateFormat?: string;
}

export function DateColumn<T>(props: DateColumnProps<T>) {
    return (
        <Column<T, dayjs.Dayjs>
            {...props}
            valueRender={a => (
                <DateCell value={a} dateFormat={props.dateFormat} />
            )}
        />
    );
}

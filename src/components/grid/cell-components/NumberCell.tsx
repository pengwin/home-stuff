import { CellContext } from '@tanstack/solid-table';
import type { JSX } from 'solid-js/jsx-runtime';
import { Accessor, createMemo } from 'solid-js';

import { useI18n } from '~/locale';
import { numberFormatter } from './number-formatter';

function NumberCellComponent(props: { value: Accessor<number> }) {
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

export function NumberCell<T>(info: CellContext<T, number>): () => JSX.Element {
    const getValue = () => info.getValue();
    return function _NumberCellComponent() {
        return <NumberCellComponent value={getValue} />;
    };
}

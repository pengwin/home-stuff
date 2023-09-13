import { createMemo } from 'solid-js';
import { UnitComponent } from './Unit';
import { Value } from '../models/Value';

export function ValueComponent(props: { value: Value }) {
    const val = createMemo(() => props.value.amount.toFixed(2));
    return (
        <span>
            {val()} <UnitComponent unit={props.value.unit} />
        </span>
    );
}

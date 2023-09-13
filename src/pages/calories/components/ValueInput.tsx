import { SetStoreFunction } from 'solid-js/store';
import { Value } from '../models/Value';

interface PFCInputProps<T> {
    param: keyof T & string;
    state: T;
    setState: SetStoreFunction<T>;
}

export function ValueInput<T>(props: PFCInputProps<T>) {
    const value = () => safeValue(props.state[props.param]);
    const unit = () => value()?.unit || 'unknown';

    const getValueFromEvent = (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (typeof target.value === 'number') {
            return new Value({ amount: target.value, unit: unit() });
        } else if (typeof target.value === 'string') {
            return new Value({ amount: parseInt(target.value), unit: unit() });
        }
        return new Value({ amount: NaN, unit: unit() });
    };

    const handleChange = (event: Event) => {
        const value = getValueFromEvent(event);
        if (isNaN(value.amount) || value.amount < 0) {
            return;
        }
        // eslint-disable-next-line solid/reactivity
        props.setState(s => {
            return { ...s, [props.param]: value };
        });
    };

    const amount = () => value()?.amount || 'null';

    return (
        <div>
            <label class="label capitalize">{props.param}</label>
            <input
                type="text"
                placeholder=""
                class="input input-bordered input-xs w-full max-w-xs"
                value={amount()}
                onChange={handleChange}
            />
            {unit()}
        </div>
    );
}

function safeValue(value: unknown): Value {
    if (value instanceof Value) {
        return value;
    }
    throw new Error(`Invalid type of value ${typeof value}`);
}

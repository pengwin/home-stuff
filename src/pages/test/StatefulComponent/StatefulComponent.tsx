import { useStoreon } from '@storeon/solidjs';
import { createMemo } from 'solid-js';

import { State, Events } from '~/store';

const Counter = () => {
    const [state, dispatch] = useStoreon<State, Events>();

    const counter = createMemo(() => state.counter);

    return (
        <h1>
            <p role="presentation">{counter()}</p>
            <button
                class="rounded border border-solid border-black"
                onClick={() => dispatch('inc')}
                role="button"
            >
                <span>inc</span>
            </button>
            <button
                class="rounded border border-solid border-black"
                onClick={() => dispatch('set', 0)}
                role="button"
            >
                <span>reset</span>
            </button>
        </h1>
    );
};

export default Counter;

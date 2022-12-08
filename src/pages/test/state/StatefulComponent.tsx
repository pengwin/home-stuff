import { createMemo } from 'solid-js';

import { useCounter } from '~/store';

const Counter = () => {
    const [state, store] = useCounter();

    const counter = createMemo(() => state.counter);

    return (
        <h1>
            <p role="presentation">{counter()}</p>
            <button
                class="rounded border border-solid border-black"
                onClick={() => store.increment()}
                role="button"
            >
                <span>+</span>
            </button>
            <button
                class="rounded border border-solid border-black"
                onClick={() => store.decrement()}
                role="button"
            >
                <span>-</span>
            </button>
            <button
                class="rounded border border-solid border-black"
                onClick={() => store.reset()}
                role="button"
            >
                <span>reset</span>
            </button>
        </h1>
    );
};

export default Counter;

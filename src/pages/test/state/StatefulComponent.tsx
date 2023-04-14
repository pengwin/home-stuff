import { createMemo } from 'solid-js';

import { useCounter } from '~/store';

import { useStore } from '@nanostores/solid';
import { i18n } from '~/stores/i18n';

export const messages = i18n('Counter', {
    reset: 'Reset',
});

const Counter = () => {
    const t = useStore(messages);
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
                <span>{t().reset}</span>
            </button>
        </h1>
    );
};

export default Counter;

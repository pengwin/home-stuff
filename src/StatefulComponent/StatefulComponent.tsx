import { useStoreon } from '@storeon/solidjs';

import { State, Events } from '../store';

export default () => {
    const [state, dispatch] = useStoreon<State, Events>();

    return (
        <h1>
            <p role="presentation">{state.counter}</p>
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

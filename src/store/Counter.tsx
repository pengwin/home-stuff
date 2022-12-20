import { createStore } from 'solid-js/store';
import { createContext, ParentProps, useContext } from 'solid-js';

interface CounterState {
    counter: number;
}

interface CounterStore {
    increment(): void;
    decrement(): void;
    reset(): void;
}

type CounterModule = [CounterState, CounterStore];

const CounterContext = createContext<CounterModule>();

interface CounterProviderProps {
    initialCounter: number;
}

export function CounterProvider(props: ParentProps<CounterProviderProps>) {
    const [state, setState] = createStore<CounterState>({
        counter: props.initialCounter,
    });
    const counter: CounterModule = [
        state,
        {
            increment() {
                setState('counter', c => c + 1);
            },
            decrement() {
                setState('counter', c => c - 1);
            },
            reset() {
                setState('counter', () => 0);
            },
        },
    ];

    return (
        <CounterContext.Provider value={counter}>
            {props.children}
        </CounterContext.Provider>
    );
}

export function useCounter() {
    const counterModule = useContext(CounterContext);
    if (!counterModule) {
        throw new Error('CounterModule is not defined');
    }
    return counterModule;
}

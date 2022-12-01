import { createStoreon, StoreonModule } from 'storeon';

export interface State {
    counter: number;
}

// Events declaration: map of event names to type of event data
export interface Events {
    // `inc` event which do not goes with any data
    inc: undefined;
    // `set` event which goes with number as data
    set: number;
    dec: undefined;
}

export const counterModule: StoreonModule<State, Events> = (store) => {
    store.on('@init', () => ({ counter: 0 }));
    store.on('inc', (state) => {
        return { counter: state.counter + 1 };
    });
    store.on('dec', (state) => {
        return { counter: state.counter - 1 };
    });
    store.on('set', (state, event) => ({ counter: event }));
};

export const store = createStoreon([counterModule]);

import { createStoreon, StoreonModule } from 'storeon';

interface CounterState {
    counter: number;
}

// Events declaration: map of event names to type of event data
interface CounterEvents {
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

export type State = CounterState;
export type Events = CounterEvents;

/*function navigateToFirstPost () {
  store.dispatch(routerNavigate, '/blog/post/first-post')
}*/

export const store = createStoreon<State, Events>([counterModule]);

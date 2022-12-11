import {
    Accessor,
    createMemo,
    createSignal,
    JSX,
    Setter,
    Signal,
} from 'solid-js';

export interface FormContext {
    setField<T>(
        name: string,
        defaultVal: T,
        required?: boolean,
    ): [Signal<T>, Accessor<string | undefined>];
    get error(): Accessor<string | undefined>;
}

interface FormProps<U extends JSX.Element> {
    class?: string;
    onSubmit: (res: unknown) => void;
    children: (context: FormContext) => U;
}

interface FieldDescription {
    name: string;
    value: Signal<unknown>;
    error: Signal<string | undefined>;
    required: boolean;
}

class FormContextImpl implements FormContext {
    private readonly res: {
        [key: string]: unknown;
    };

    private readonly fields: Array<FieldDescription>;

    constructor(private readonly errorSignal: Signal<string | undefined>) {
        this.res = {};
        this.fields = [];
    }

    setField<T>(
        name: string,
        defaultVal: T,
        required?: boolean,
    ): [Signal<T>, Accessor<string | undefined>] {
        // eslint-disable-next-line solid/reactivity
        const [get, set] = createSignal(defaultVal);
        const [getError, setError] = createSignal<string>(undefined);

        this.fields.push({
            name,
            value: [get, set as Setter<unknown>],
            error: [getError, setError],
            required: !!required,
        });

        return [[get, set], getError];
    }

    get result(): unknown {
        return this.res;
    }

    get error(): Accessor<string | undefined> {
        return this.errorSignal[0];
    }

    process(): boolean {
        let hasErrors = false;
        for (const field of this.fields) {
            const [get] = field.value;

            const val = get();
            if (field.required && !this.checkRequired(val)) {
                hasErrors = true;
                field.error[1]('Required');
            } else {
                this.res[field.name] = val;
                field.error[1](undefined);
            }
        }

        if (hasErrors) {
            this.errorSignal[1]('Error');
        } else {
            this.errorSignal[1](undefined);
        }
        return hasErrors;
    }

    private checkRequired(v: unknown) {
        if (typeof v === undefined) {
            return false;
        }

        if (v === null) {
            return false;
        }

        if (v === '') {
            return false;
        }

        if (v === false) {
            return;
        }

        return true;
    }
}

export function Form<U extends JSX.Element>(props: FormProps<U>) {
    const classValue = createMemo(() => props.class || '');
    const [error, setError] = createSignal<string | undefined>(undefined);

    const ctx = new FormContextImpl([error, setError]);

    const onSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        if (!ctx.process()) {
            props.onSubmit(ctx.result);
        }
    };

    return (
        <form class={classValue()} onSubmit={onSubmit}>
            {props.children(ctx)}
        </form>
    );
}

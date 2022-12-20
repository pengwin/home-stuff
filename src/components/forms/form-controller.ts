import { Accessor, createSignal, Setter, Signal } from 'solid-js';
import type { FormControlParams } from './controls/form-control-params';
import type { FormControlContext, FormContext } from './form-context';
import { Validator, ErrorContext } from './validators/validator';
import { FieldDescription } from './Form';

export class FormController implements FormContext {
    private readonly fields: Map<string, FieldDescription>;

    constructor(private readonly errorSignal: Signal<boolean>) {
        this.fields = new Map<string, FieldDescription>();
    }

    addControl<T>(
        props: FormControlParams,
        defaultVal: T,
        validators: ReadonlyArray<Validator>,
    ): FormControlContext<T> {
        const { name } = props;
        const [get, set] = createSignal(defaultVal);
        const [getError, setError] = createSignal<ErrorContext | undefined>(
            undefined,
        );

        this.fields.set(name, {
            value: [get, set as Setter<unknown>],
            error: [getError, setError],
            validators,
        });

        return { get, set, error: getError };
    }

    get formError(): Accessor<boolean> {
        return this.errorSignal[0];
    }

    async process(): Promise<{ [key: string]: unknown } | undefined> {
        let hasErrors = false;
        const res: { [key: string]: unknown } = {};
        for (const [name, field] of this.fields.entries()) {
            const [get] = field.value;

            const val = get();

            let fieldHasError = false;
            for (const validator of field.validators) {
                const checkResult = await validator.validate(val);
                if (checkResult) {
                    hasErrors = true;
                    field.error[1](checkResult);
                    fieldHasError = true;
                    break;
                }
            }

            if (!fieldHasError) {
                field.error[1](undefined);
                const fieldVal = field.value[0]();
                res[name] = fieldVal;
            } else {
                delete res[name];
            }
        }

        const [_, setFormError] = this.errorSignal;

        if (hasErrors) {
            setFormError(true);
            return undefined;
        }

        setFormError(false);
        return res;
    }
}

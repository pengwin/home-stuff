import type { ErrorContext, Validator } from './validator';

export class RequiredValidator implements Validator {
    constructor(private readonly errorContext: ErrorContext) {}

    get category(): string {
        return 'required';
    }

    validate(v: unknown): Promise<ErrorContext | undefined> {
        return Promise.resolve(this.validateImpl(v));
    }

    private validateImpl(v: unknown): ErrorContext | undefined {
        if (typeof v === 'undefined') {
            return this.errorContext;
        }

        if (v === null) {
            return this.errorContext;
        }

        if (v === '') {
            return this.errorContext;
        }

        if (v === false) {
            return this.errorContext;
        }

        return;
    }
}

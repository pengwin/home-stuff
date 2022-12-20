import { Accessor } from 'solid-js';

export interface ErrorContext {
    error: Accessor<string>;
}

export interface Validator {
    get category(): string;
    validate(v: unknown): Promise<ErrorContext | undefined>;
}

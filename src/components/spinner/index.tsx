import { createMemo } from 'solid-js';

export const Spinner = (props: { text?: string; classNames?: string }) => {
    const classNames = createMemo(() => {
        let val = 'btn btn-outline border-none loading';
        if (props.classNames) {
            val += ' ' + props.classNames;
        }
        return val;
    });
    return <button class={classNames()}>{props.text}</button>;
};

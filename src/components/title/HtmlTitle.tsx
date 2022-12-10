import { onMount, onCleanup, createEffect } from 'solid-js';

export function HtmlTitle(props: { title: string }) {
    onMount(() => {
        const oldTitle = document.title;

        onCleanup(() => (document.title = oldTitle));
    });

    createEffect(() => {
        document.title = props.title;
    });

    return <></>;
}

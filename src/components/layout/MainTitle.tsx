import { JSX, children } from 'solid-js';

export function MainTitle(props: { children: JSX.Element }) {
    const resolved = children(() => props.children);

    return <h1 class="uppercase font-bold font-mono">{resolved()}</h1>;
}

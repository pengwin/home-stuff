import { JSX, children } from 'solid-js';

export function SectionTitle(props: { children: JSX.Element }) {
    const resolved = children(() => props.children);

    return <h2 class="uppercase font-bold font-mono">{resolved()}</h2>;
}

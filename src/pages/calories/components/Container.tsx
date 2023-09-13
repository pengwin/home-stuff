import { JSX, children } from 'solid-js';

export function Container(props: { children: JSX.Element }) {
    const resolved = children(() => props.children);

    return (
        <div class="container mx-auto mb-2 p-2 border-2 border-dotted border-gray-100 rounded-md">
            {resolved()}
        </div>
    );
}

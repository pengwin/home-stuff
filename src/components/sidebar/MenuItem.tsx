import { children, ParentProps } from 'solid-js';

interface PropsA {
    href: string;
    activeClass?: string;
    inactiveClass?: string;
    class?: string;
}

function A(props: ParentProps<PropsA>) {
    const content = children(() => props.children);
    const classValue = () => (props.class || '') + (props.activeClass || '');
    return (
        <a href={props.href} class={classValue()}>
            {content}
        </a>
    );
}

export function MenuItem(props: { href: string; text: string }) {
    return (
        <li>
            <A
                href={props.href}
                activeClass="btn-outline btn-primary"
                inactiveClass=""
                class=""
            >
                {props.text}
            </A>
        </li>
    );
}

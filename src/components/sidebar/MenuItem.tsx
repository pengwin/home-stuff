import { children, ParentProps } from 'solid-js';
import { useRouter } from '~/store';

interface PropsA {
    href: string;
    activeClass?: string;
    inactiveClass?: string;
    class?: string;
}

function A(props: ParentProps<PropsA>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [s, router] = useRouter();
    const content = children(() => props.children);
    const classValue = () => (props.class || '') + (props.activeClass || '');

    const onClick = (e: Event) => {
        e.preventDefault();
        router.navigate(props.href);
    };

    return (
        <a href={props.href} class={classValue()} onClick={onClick}>
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

import { children, ParentProps, createMemo } from 'solid-js';
import { useRouter } from '~/store';
import { normalizePath } from '~/router';

interface PropsA {
    href: string;
    activeClass?: string;
    inactiveClass?: string;
    class?: string;
}

export function A(props: ParentProps<PropsA>) {
    const [state, router] = useRouter();

    const normalizedHref = createMemo(() => normalizePath(props.href));
    const path = createMemo(() => state.currentPath || '');

    const isCurrent = createMemo(() => path() === normalizedHref());
    const toggleClass = createMemo(() =>
        isCurrent() ? props.activeClass : props.inactiveClass,
    );
    const classValue = createMemo(
        () => (props.class || '') + (toggleClass() || ''),
    );

    const onClick = (e: Event) => {
        e.preventDefault();
        router.navigate(props.href);
    };

    const content = children(() => props.children);

    return (
        <a href={props.href} class={classValue()} onClick={onClick}>
            {content}
        </a>
    );
}

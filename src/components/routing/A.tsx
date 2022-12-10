import { children, ParentProps, createMemo } from 'solid-js';
import { useRouter } from '~/store';
import { normalizePath } from '~/router';

interface PropsA {
    href: string;
    activeClass?: string;
    inactiveClass?: string;
    class?: string;
    role:
        | 'alert'
        | 'alertdialog'
        | 'application'
        | 'article'
        | 'banner'
        | 'button'
        | 'cell'
        | 'checkbox'
        | 'columnheader'
        | 'combobox'
        | 'complementary'
        | 'contentinfo'
        | 'definition'
        | 'dialog'
        | 'directory'
        | 'document'
        | 'feed'
        | 'figure'
        | 'form'
        | 'grid'
        | 'gridcell'
        | 'group'
        | 'heading'
        | 'img'
        | 'link'
        | 'list'
        | 'listbox'
        | 'listitem'
        | 'log'
        | 'main'
        | 'marquee'
        | 'math'
        | 'menu'
        | 'menubar'
        | 'menuitem'
        | 'menuitemcheckbox'
        | 'menuitemradio'
        | 'meter'
        | 'navigation'
        | 'none'
        | 'note'
        | 'option'
        | 'presentation'
        | 'progressbar'
        | 'radio'
        | 'radiogroup'
        | 'region'
        | 'row'
        | 'rowgroup'
        | 'rowheader'
        | 'scrollbar'
        | 'search'
        | 'searchbox'
        | 'separator'
        | 'slider'
        | 'spinbutton'
        | 'status'
        | 'switch'
        | 'tab'
        | 'table'
        | 'tablist'
        | 'tabpanel'
        | 'term'
        | 'textbox'
        | 'timer'
        | 'toolbar'
        | 'tooltip'
        | 'tree'
        | 'treegrid'
        | 'treeitem';
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
        <a
            href={props.href}
            class={classValue()}
            onClick={onClick}
            role={props.role}
        >
            {content}
        </a>
    );
}

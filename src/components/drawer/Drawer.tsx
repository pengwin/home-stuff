import { children, JSX, ParentProps } from 'solid-js';

interface Props {
    drawerId: string;
    sidebar: JSX.Element;
}

export function Drawer(props: ParentProps<Props>) {
    const content = children(() => props.children);
    const sidebar = children(() => props.sidebar);
    return (
        <div class="drawer-mobile drawer">
            <input id={props.drawerId} type="checkbox" class="drawer-toggle" />
            <div class="drawer-content flex flex-col items-center">
                {content}
            </div>
            <div class="drawer-side lg:shadow-sm">
                <label for={props.drawerId} class="drawer-overlay" />
                {sidebar}
            </div>
        </div>
    );
}

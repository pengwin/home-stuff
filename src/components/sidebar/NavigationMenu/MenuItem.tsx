import { A } from '~/components/routing';

export function MenuItem(props: { href: string; text: string }) {
    return (
        <li>
            <A
                href={props.href}
                activeClass="active"
                inactiveClass=""
                class=""
                role="navigation"
            >
                {props.text}
            </A>
        </li>
    );
}

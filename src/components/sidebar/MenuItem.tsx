import { A } from '~/components/routing';

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

import { A } from '@solidjs/router';

export function MenuItem(props: { href: string; text: string }) {
    return (
        <li>
            <A
                href={props.href}
                activeClass="bg-blue-700 text-white dark:text-white md:bg-transparent md:text-blue-700"
                inactiveClass="text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
                class="block rounded  py-2 pl-3 pr-4 md:p-0 "
            >
                {props.text}
            </A>
        </li>
    );
}

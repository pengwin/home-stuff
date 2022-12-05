import { Accessor } from 'solid-js';
import { MenuItem } from './MenuItem';

export function Menu(props: { expanded: Accessor<boolean> }) {
    return (
        <div
            class="w-full md:block md:w-auto"
            classList={{ hidden: !props.expanded() }}
            id="navbar-default"
        >
            <ul class="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray-900">
                <MenuItem href="/test/comp/111" text="Test.Comp 111" />
                <MenuItem href="/test/comp/abc" text="Test.Comp abc" />
                <MenuItem href="/test/state" text="Test.State" />
            </ul>
        </div>
    );
}

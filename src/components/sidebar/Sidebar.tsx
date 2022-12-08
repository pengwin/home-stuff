import { MenuItem } from './MenuItem';

export function Sidebar() {
    return (
        <ul class="menu w-56 bg-base-100 p-4 text-base-content">
            <MenuItem href="/test/comp/111" text="Test.Comp 111" />
            <MenuItem href="/test/comp/abc" text="Test.Comp abc" />
            <MenuItem href="/test/comp/test" text="Test.Comp Test" />
            <MenuItem href="/test/state" text="Test.State" />
        </ul>
    );
}
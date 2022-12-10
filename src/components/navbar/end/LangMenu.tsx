import IconEarth from '~icons/mdi/earth';
import LangMenuItems from '~/components/LangMenuItems';

export function LangMenu() {
    return (
        <div class="dropdown-end dropdown hidden lg:block">
            <label tabindex="0" class="btn-ghost btn-circle btn">
                <IconEarth class="text-lg" />
            </label>
            <ul
                tabindex="0"
                class="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
            >
                <LangMenuItems />
            </ul>
        </div>
    );
}

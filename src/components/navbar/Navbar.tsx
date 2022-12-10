import NavbarStart from './start';
import NavbarCenter from './center';
import NavbarEnd from './end';

export function Navbar(props: { drawerId: string }) {
    return (
        <div class="navbar mb-1 rounded-none bg-base-100 lg:mb-3 lg:mt-2 lg:shadow-sm">
            <NavbarStart drawerId={props.drawerId} />
            <NavbarCenter />
            <NavbarEnd />
        </div>
    );
}

import { Logo } from './Logo';
import { Burger } from './Burger';
import { Current } from './Current';

export function Navbar(props: { drawerId: string }) {
    return (
        <div class="navbar bg-base-100">
            <div class="navbar-start">
                <Burger drawerId={props.drawerId} />
                <Logo />
            </div>
            <div class="navbar-center flex">
                <Current />
            </div>
            <div class="navbar-end">
                <a class="btn">Get started</a>
            </div>
        </div>
    );
}

import { Logo } from './Logo';
import { Burger } from './Burger';

export default function NavbarStart(props: { drawerId: string }) {
    return (
        <div class="navbar-start">
            <Burger drawerId={props.drawerId} />
            <Logo />
        </div>
    );
}

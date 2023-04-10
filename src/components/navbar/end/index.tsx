/* eslint-disable tailwindcss/classnames-order */
import { LangMenu } from './LangMenu';
import { LoginButton } from './LoginButton';

export default function NavbarEnd() {
    return (
        <div class="navbar-end">
            <LoginButton />
            <LangMenu />
        </div>
    );
}

import { Logo } from './Logo';
import { Burger } from './Burger';
import { Menu } from './Menu';
import { createSignal } from 'solid-js';

export function Navbar() {
    const [expanded, setExpanded] = createSignal(false);
    const toggler = () => setExpanded(!expanded());

    return (
        <nav class="rounded border-gray-200 bg-white px-2 py-2.5 dark:bg-gray-900 sm:px-4">
            <div class="container mx-auto flex flex-wrap items-center justify-between">
                <Logo />
                <Burger toggler={toggler} />
                <Menu expanded={expanded} />
            </div>
        </nav>
    );
}

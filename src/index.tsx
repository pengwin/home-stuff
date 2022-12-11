import './index.css';
import { render } from 'solid-js/web';

import App from '~/components/app';
import { SwUserApi } from './api/user';
import { TestAuthApi } from './api/auth';
import { BrowserNavigationApi } from './router';

function main() {
    const dependencies = {
        userAPI: new SwUserApi(),
        authAPI: new TestAuthApi(),
        navigationApi: new BrowserNavigationApi(),
    };
    render(
        () => <App dependencies={dependencies} />,
        document.getElementById('root') as HTMLElement,
    );
}

main();

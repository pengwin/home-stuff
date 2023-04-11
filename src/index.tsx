import './index.css';
import { render } from 'solid-js/web';

import App from '~/components/app';
import { AuthServiceApi } from './api/auth';
import { registerServiceWorker } from './sw-loader';
import { ApiMiddleware } from './api/api-middleware';
import { LocalStorageTokenStorage } from './api/token-storage';

function main() {
    registerServiceWorker();
    const apiMiddleware = new ApiMiddleware();
    const tokenStorage = new LocalStorageTokenStorage();
    const dependencies = {
        apiMiddleware,
        authAPI: new AuthServiceApi(tokenStorage, apiMiddleware),
    };
    render(
        () => <App dependencies={dependencies} />,
        document.getElementById('root') as HTMLElement,
    );
}

main();

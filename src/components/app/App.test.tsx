import { describe, test, afterEach } from 'vitest';
import { cleanup, render } from '@solidjs/testing-library';
import '@testing-library/jest-dom';

import { App } from './App';
import { AuthApi, User } from '~/api/auth';
import { Location, NavigateOptions, NavigationApi } from '~/router';
import { ApiMiddleware } from '~/api/api-middleware';
import { AuthApiError } from '~/api/auth/auth';

class TestAuthApi implements AuthApi {
    login(_username: string, _password: string): Promise<User | AuthApiError> {
        throw new Error('Method not implemented.');
    }
    getAuthenticated(): Promise<User | AuthApiError> {
        return Promise.resolve(new AuthApiError('app', 'test'));
    }
    setAuthenticated(_user: User) {
        throw new Error('Method not implemented.');
    }
    removeAuthenticated(): void {
        throw new Error('Method not implemented.');
    }
}

class TestNavApi implements NavigationApi {
    navigate(_path: string, _options?: NavigateOptions): void {
        return;
    }
    subscribe(_listener: (state: unknown) => void) {
        return;
    }
    get location(): Location {
        return {
            path: '/',
            search: '',
        };
    }
}

describe('<App /> smoke tests', () => {
    afterEach(cleanup);

    test('it will render successfully', () => {
        const dependencies = {
            apiMiddleware: new ApiMiddleware(),
            authAPI: new TestAuthApi(),
            navigationApi: new TestNavApi(),
        };
        render(() => <App dependencies={dependencies} />);
    });
});

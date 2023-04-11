import { describe, test } from 'vitest';

import { render } from '@solidjs/testing-library';

import { App } from './App';
import { AuthApi, User } from '~/api/auth';
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

describe('<App /> smoke tests', () => {
    test('it will render successfully', () => {
        const dependencies = {
            apiMiddleware: new ApiMiddleware(),
            authAPI: new TestAuthApi(),
        };
        render(() => <App dependencies={dependencies} />);
    });
});

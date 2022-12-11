import { describe, expect, test } from 'vitest';

import matchers from '@testing-library/jest-dom/matchers';

import { render } from 'solid-testing-library';

import { App } from './App';
import { Profile, UserApi } from '~/api/user';
import { TestAuthApi } from '~/api/auth';
import { Location, NavigateOptions, NavigationApi } from '~/router';

expect.extend(matchers);

class TestUserApi implements UserApi {
    getUserProfile(userId: number): Promise<Profile> {
        return Promise.resolve({
            name: 'Test',
            userId,
        });
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
    test('it will render successfully', () => {
        const dependencies = {
            userAPI: new TestUserApi(),
            authAPI: new TestAuthApi(),
            navigationApi: new TestNavApi(),
        };
        render(() => <App dependencies={dependencies} />);
    });
});

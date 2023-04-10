import jwtDecode from 'jwt-decode';

import {
    AuthApi as AuthServiceClient,
    Configuration,
    FetchError,
    Middleware,
    ResponseError,
} from '../auth-service-client';
import { TokenStorage } from '../token-storage';

export interface User {
    id: string;
    username: string;
    token: string;
}

interface JwtUser {
    aud: string;
    exp: number;
    iat: number;
    iss: string;
    sub: string;
}

type AuthApiErrorType =
    | 'app'
    | 'internal'
    | 'httpError'
    | 'fetchError'
    | 'unauthorized';

export class AuthApiError {
    constructor(
        private readonly _type: AuthApiErrorType,
        private readonly _message: string,
        private readonly _error?: Error,
    ) {}

    get type() {
        return this._type;
    }

    get message() {
        return this._message;
    }

    get stack() {
        return this._error?.stack;
    }
}

export interface AuthApi {
    login(username: string, password: string): Promise<User | AuthApiError>;
    getAuthenticated(): Promise<User | AuthApiError>;
    setAuthenticated(user: User);
    removeAuthenticated(): void;
}

export class AuthServiceApi implements AuthApi {
    private readonly client: AuthServiceClient;

    constructor(
        private readonly tokenStorage: TokenStorage,
        middleware: Middleware,
    ) {
        const configuration = new Configuration({
            basePath: import.meta.env.VITE_AUTH_SERVICE_URL,
            accessToken: () => this.tokenStorage.get() || '',
            middleware: [middleware],
        });
        this.client = new AuthServiceClient(configuration);
    }

    async login(login: string, password: string): Promise<User | AuthApiError> {
        try {
            const data = await this.client.authorize({
                authRequest: { login, password },
            });

            this.tokenStorage.set(data.token);

            return this.getUserByToken(data.token);
        } catch (e) {
            return processError(e);
        }
    }

    async getAuthenticated(): Promise<User | AuthApiError> {
        const token = this.tokenStorage.get();
        if (!token) {
            return new AuthApiError('unauthorized', 'No token');
        }
        return this.getUserByToken(token);
    }

    setAuthenticated(user: User) {
        this.tokenStorage.set(user.token);
    }

    removeAuthenticated() {
        this.tokenStorage.remove();
    }

    private async getUserByToken(token: string): Promise<User | AuthApiError> {
        try {
            const jwtUser = jwtDecode<JwtUser>(token);
            const profile = await this.client.profile();
            return {
                id: jwtUser.sub,
                username: profile.username,
                token,
            };
        } catch (e) {
            return processError(e);
        }
    }
}

async function processResponseError(
    response: Response,
    error?: Error,
): Promise<AuthApiError> {
    const httpErrorText = await response.text();
    if (response.status === 401) {
        return new AuthApiError('unauthorized', httpErrorText, error); //'Invalid login or password');
    }
    if (response.status === 500) {
        return new AuthApiError('internal', httpErrorText, error); //'Internal server error');
    }
    return new AuthApiError('httpError', httpErrorText, error);
}

async function processError(error: Error): Promise<AuthApiError> {
    if (error instanceof ResponseError) {
        return processResponseError(error.response, error);
    }
    if (error instanceof FetchError) {
        return new AuthApiError('fetchError', error.message, error);
    }
    return new AuthApiError('app', error.message, error);
}

import jwtDecode from 'jwt-decode';

export interface User {
    id: number;
    username: string;
    jwt: string;
}

export interface AuthApi {
    login(username: string, password: string): Promise<User>;
    getAuthenticated(): User | undefined;
    setAuthenticated(user: User);
}

export class TestAuthApi implements AuthApi {
    login(username: string, password: string): Promise<User | undefined> {
        if (username !== 'test' && password === '1234') {
            return;
        }

        const token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsInVzZXJuYW1lIjoidGVzdCJ9.SH5ipm25byPyEHz9VTR4MWmUZjFQp1LIwtZMoa7-_FU';

        return Promise.resolve(this.getUserByToken(token));
    }

    getAuthenticated(): User | undefined {
        const token = localStorage.getItem('jwt');
        if (!token) {
            return;
        }
        return this.getUserByToken(token);
    }

    setAuthenticated(user: User) {
        localStorage.setItem('jwt', user.jwt);
    }

    private getUserByToken(token: string): User {
        const user = jwtDecode<User>(token);
        return {
            id: user.id,
            username: user.username,
            jwt: token,
        };
    }
}

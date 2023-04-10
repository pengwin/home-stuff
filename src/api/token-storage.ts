export interface TokenStorage {
    set(token: string): void;
    get(): string | null;
    remove(): void;
}

export class LocalStorageTokenStorage implements TokenStorage {
    private readonly jwtKey: string = 'jwt';

    set(token: string) {
        localStorage.setItem(this.jwtKey, token);
    }

    get() {
        return localStorage.getItem(this.jwtKey);
    }

    remove() {
        localStorage.removeItem(this.jwtKey);
    }
}

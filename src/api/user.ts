export interface User {
    name: string;
}

export interface UserApi {
    getById(id: number): Promise<User>;
}

export class SwUserApi implements UserApi {
    async getById(id: number): Promise<User> {
        const res = await fetch(`https://swapi.dev/api/people/${id}/`, {
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const json = await res.json();

        return {
            name: json.name,
        };
    }
}

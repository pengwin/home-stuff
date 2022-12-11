export interface Profile {
    userId: number;
    name: string;
}

export interface UserApi {
    getUserProfile(userId: number): Promise<Profile>;
}

export class SwUserApi implements UserApi {
    async getUserProfile(userId: number): Promise<Profile> {
        const res = await fetch(`https://swapi.dev/api/people/${userId}/`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const json = await res.json();

        return {
            userId,
            name: json.name,
        };
    }
}

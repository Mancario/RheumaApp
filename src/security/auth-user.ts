export interface AuthUser {
    username: string;
    uid: string;
    authToken: string;
    serialize(): string;
}

interface AuthUserData {
    username: string;
    uid: string;
    authToken: string;
}

export class AuthUserImpl implements AuthUser {

    public static fromSerialization(s: string): AuthUserImpl {
        if (!s) return null;
        try {
            const data: AuthUserData = JSON.parse(s);
            if (!data) return null;
            return new AuthUserImpl(data.username, data.uid, data.authToken);
        } catch (e) {
            console.error("Cannot deserialize user", s, e);
            return null;
        }
    }

    public constructor(public username: string,
                       public uid: string,
                       public authToken: string) {
    }

    public serialize(): string {
        return JSON.stringify({
            username: this.username,
            uid: this.uid,
            authToken: this.authToken
        });
    }
}

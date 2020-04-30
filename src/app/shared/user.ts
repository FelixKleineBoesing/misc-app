export class User {
    username: string = '';
    email: string = '';
    name: string = '';
    password: string = '';
    role: Role = Role.user;
    token: string;

    constructor(values: object) {
        Object.assign(this, values);
    }
}

export enum Role {
    user,
    admin
}
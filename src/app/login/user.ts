export class User {
    username: string;
    email: string;
    name: string;
    password: string;
    role: Role;
}

export enum Role {
    guest,
    user,
    admin
}
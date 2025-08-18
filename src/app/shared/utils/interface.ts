export type User = {
    username: string;
    email: string;
    password: string;
}

export interface UserResponse extends User {
    id: number;
}
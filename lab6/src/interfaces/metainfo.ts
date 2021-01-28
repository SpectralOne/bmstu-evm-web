import { User } from './user';

export interface Meta {
    isAuth: boolean,
    user: User | undefined,
    error: any
}
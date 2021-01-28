import { User } from './interfaces/user';
import { Game } from './interfaces/game';

export const users_db: User[] = [
    {
        login: "root",
        pass: "password",
        hobby: "web",
        age: 32
    },
    {
        login: "user",
        pass: "user",
        hobby: "none",
        age: 18
    },
    {
        login: "test",
        pass: "test",
        hobby: "test",
        age: 0
    }
]

export const games_db: Game[] = [
    {
        name: "nodejs",
        desc: "...",
        age: 18
    },
    {
        name: "dota2",
        desc: "family oriented",
        age: 666
    }
]
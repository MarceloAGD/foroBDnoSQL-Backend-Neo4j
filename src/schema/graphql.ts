
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class UserInput {
    nickname?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
    language?: Nullable<string>;
    country?: Nullable<string>;
}

export class User {
    id: number;
    nickname: string;
    email: string;
    password: string;
    language?: Nullable<string>;
    country?: Nullable<string>;
    friend?: Nullable<User[]>;
}

export class Tag {
    name: string;
}

export class Post {
    title: string;
    likes?: Nullable<User[]>;
    dislikes?: Nullable<User[]>;
    tags?: Nullable<Tag[]>;
}

export class Community {
    name: string;
    members?: Nullable<User[]>;
    tags?: Nullable<Tag[]>;
}

export abstract class IMutation {
    abstract createUserNeo4j(userInput: UserInput): User | Promise<User>;

    abstract addFriendNeo4j(emailUser1: string, emailUser2: string): User | Promise<User>;
}

export abstract class IQuery {
    abstract getUserNeo4j(email: string): User | Promise<User>;
}

type Nullable<T> = T | null;

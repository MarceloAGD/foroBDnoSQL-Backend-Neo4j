
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class UserInput {
    nickname: string;
    email: string;
    password: string;
    language: string;
    country: string;
}

export class PostInput {
    title: string;
    tag: Nullable<TagInput>[];
}

export class CommInput {
    name: string;
    author: string;
    tag: Nullable<TagInput>[];
}

export class TagInput {
    name: string;
}

export class User {
    id: number;
    nickname: string;
    email: string;
    password: string;
    language?: Nullable<string>;
    country?: Nullable<string>;
}

export class Tag {
    id: number;
    name: string;
}

export class Post {
    id: number;
    title: string;
}

export class Community {
    id: number;
    name: string;
}

export abstract class IMutation {
    abstract createUserNeo4j(userInput: UserInput): User | Promise<User>;

    abstract createTagNeo4j(name: string): Tag | Promise<Tag>;

    abstract createPostNeo4j(postInput: PostInput): Post | Promise<Post>;

    abstract createCommNeo4j(commInput: CommInput): Community | Promise<Community>;

    abstract addFriendNeo4j(emailUser1: string, emailUser2: string): boolean | Promise<boolean>;

    abstract addMemberNeo4j(email: string, comm: string): boolean | Promise<boolean>;
}

export abstract class IQuery {
    abstract getUserNeo4j(email: string): User | Promise<User>;

    abstract getFriendsNeo4j(email: string): User[] | Promise<User[]>;
}

type Nullable<T> = T | null;

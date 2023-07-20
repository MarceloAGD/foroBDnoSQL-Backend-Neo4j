
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
    id: string;
    title: string;
    author?: Nullable<string>;
    description: string;
    comm?: Nullable<string>;
    tag: Nullable<TagInput>[];
}

export class CommInput {
    name: string;
    author?: Nullable<string>;
    tag?: Nullable<Nullable<TagInput>[]>;
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
    id: string;
    title: string;
    comm: string;
    description: string;
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

    abstract addLikePostNeo4j(postId: string, email: string): Post | Promise<Post>;

    abstract addDislikePostNeo4j(postId: string, email: string): Post | Promise<Post>;

    abstract deletePostNeo4j(postId: string): boolean | Promise<boolean>;

    abstract delteCommNeo4j(name: string): boolean | Promise<boolean>;
}

export abstract class IQuery {
    abstract getUserNeo4j(email: string): User | Promise<User>;

    abstract getFriendsNeo4j(email: string): User[] | Promise<User[]>;

    abstract getPostSameTagNeo4j(postId: string): Post[] | Promise<Post[]>;

    abstract getCommFriendNeo4j(email: string): Community[] | Promise<Community[]>;
}

type Nullable<T> = T | null;

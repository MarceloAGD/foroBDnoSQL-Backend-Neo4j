import { Injectable } from '@nestjs/common';
import { Neo4jPostRepository } from './neo4j-post.repository';
import { Post, PostInput } from 'src/schema/graphql';

@Injectable()
export class Neo4jPostService {
    constructor(private readonly postRepository: Neo4jPostRepository){}

    async createPostNeo4j(postInput: PostInput): Promise<Post>{
        return await this.postRepository.createPostNeo4j(postInput);
    }
}

import { Injectable } from '@nestjs/common';
import { Neo4jPostRepository } from './neo4j-post.repository';
import { Post } from 'src/schema/graphql';

@Injectable()
export class Neo4jPostService {
    constructor(private readonly postRepository: Neo4jPostRepository){}

    async createPostNeo4j(title: string): Promise<Post>{
        return await this.postRepository.createPostNeo4j(title);
    }
}

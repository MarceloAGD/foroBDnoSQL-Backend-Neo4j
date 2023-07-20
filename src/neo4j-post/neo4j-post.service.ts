import { Injectable } from '@nestjs/common';
import { Neo4jPostRepository } from './neo4j-post.repository';
import { Post, PostInput } from 'src/schema/graphql';

@Injectable()
export class Neo4jPostService {
    constructor(private readonly postRepository: Neo4jPostRepository){}

    async createPostNeo4j(postInput: PostInput): Promise<Post>{
        return await this.postRepository.createPostNeo4j(postInput);
    }

    async addLikePostNeo4j(postId: string, email: string): Promise<Post>{
        const verificar = await this.postRepository.likeVerificator(postId, email);
        if(!verificar){
            return await this.postRepository.addLikePostNeo4j(postId, email);
        }
         return await this.postRepository.eliminatedLike(postId, email);
    }

    async addDislikePostNeo4j(postId: string, email: string): Promise<Post>{
        const verificar = await this.postRepository.dislikeVerificator(postId, email);
        if(!verificar){
            return await this.postRepository.addDislikePostNeo4j(postId, email);
        }
        return await this.postRepository.eliminatedDislike(postId, email);    
    }
}

import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Neo4jPostService } from './neo4j-post.service';
import { Post, PostInput } from 'src/schema/graphql';

@Resolver()
export class Neo4jPostResolver {
    constructor(private readonly postService: Neo4jPostService){}

    @Mutation(()=> Post)
    async createPostNeo4j(@Args('postInput') postInput: PostInput): Promise<Post>{
        return await this.postService.createPostNeo4j(postInput);
    }

    @Mutation(()=> Post)
    async addLikePostNeo4j(@Args('postId') postId: string,@Args('email') email: string): Promise<Post>{
        return await this.postService.addLikePostNeo4j(postId,email);
    }

    @Mutation(()=> Post)
    async addDislikePostNeo4j(@Args('postId') postId: string,@Args('email') email: string): Promise<Post>{
        return await this.postService.addDislikePostNeo4j(postId,email);
    }

    @Mutation(() => Boolean)
    async deletePostNeo4j(@Args('postId') postId: string): Promise<boolean>{
        return await this.postService.deletePostNeo4j(postId);
    }
}

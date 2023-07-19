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
}

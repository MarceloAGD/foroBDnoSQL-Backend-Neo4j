import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Neo4jTagService } from './neo4j-tag.service';
import { Tag } from 'src/schema/graphql';

@Resolver()
export class Neo4jTagResolver {
    constructor(private readonly tagService: Neo4jTagService){}

    @Mutation(() => Tag)
    async createTagNeo4j(@Args('name') name: string): Promise<Tag>{
        return await this.tagService.createTagNeo4j(name);
    }
}

import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Neo4jCommService } from './neo4j-comm.service';
import { Community } from 'src/schema/graphql';

@Resolver()
export class Neo4jCommResolver {
    constructor(private readonly commService: Neo4jCommService){}

    @Mutation(()=> Community)
    async createCommNeo4j(@Args('name') name: string): Promise<Community>{
        return await this.commService.createCommNeo4j(name);
    }
}

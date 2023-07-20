import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Neo4jCommService } from './neo4j-comm.service';
import { CommInput, Community } from 'src/schema/graphql';

@Resolver()
export class Neo4jCommResolver {
    constructor(private readonly commService: Neo4jCommService){}

    @Mutation(()=> Community)
    async createCommNeo4j(@Args('commInput') commInput: CommInput): Promise<Community>{
        return await this.commService.createCommNeo4j(commInput);
    }

    @Mutation(()=> Boolean)
    async addMemberNeo4j(@Args('email') email: string, @Args('comm') comm: string): Promise<boolean>{
        return await this.commService.addMemberNeo4j(email, comm);
    }

    @Mutation(()=> Boolean)
    async deleteCommNeo4j(@Args('name') name: string): Promise<Boolean>{
        return await this.commService.deleteCommNeo4j(name)
    }
}

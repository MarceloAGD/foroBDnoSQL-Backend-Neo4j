import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Neo4jUserService } from './neo4j-user.service';
import { User, UserInput } from 'src/schema/graphql';

@Resolver()
export class Neo4jUserResolver {
    constructor(private readonly userService: Neo4jUserService){}

    @Mutation(()=> User)
    async createUserNeo4j(@Args('userInput') userInput: UserInput): Promise<User>{
        return await this.userService.createUserNeo4j(userInput);
    }

    @Query()
    async getUserNeo4j(@Args('id') id: number): Promise<User>{
        return await this.userService.getUserNeo4j(id);
    }
}

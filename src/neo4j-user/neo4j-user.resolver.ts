import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Neo4jUserService } from './neo4j-user.service';
import { User, UserInput } from 'src/schema/graphql';

@Resolver()
export class Neo4jUserResolver {
  constructor(private readonly userService: Neo4jUserService) {}

  @Mutation(() => User)
  async createUserNeo4j(
    @Args('userInput') userInput: UserInput,
  ): Promise<User> {
    return await this.userService.createUserNeo4j(userInput);
  }

  @Mutation(() => Boolean)
  async addFriendNeo4j(
    @Args('emailUser1') emailUser1: string,
    @Args('emailUser2') emailUser2: string,
  ): Promise<Boolean> {
    return await this.userService.addFriendNeo4j(emailUser1, emailUser2);
  }

  @Mutation(()=> Boolean)
  async removeFriendNeo4j(
    @Args('emailUser1') emailUser1: string,
    @Args('emailUser2') emailUser2: string,
  ): Promise<Boolean> {
    return await this.removeFriendNeo4j(emailUser1, emailUser2);
  }
  @Query(()=> User)
  async getUserNeo4j(@Args('email') email: string): Promise<User> {
    return await this.userService.getUserNeo4j(email);   
  }

  @Query(()=> [User])
  async getFriendsNeo4j(@Args('email') email: string): Promise<User[]> {
    return await this.userService.getFriendsNeo4j(email);
  }
}

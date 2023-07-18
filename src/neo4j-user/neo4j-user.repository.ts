import { Injectable } from "@nestjs/common";
import { QueryRepository } from "src/neo4j/query.repository";
import { User, UserInput } from "src/schema/graphql";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class Neo4jUserRepository{
    constructor(private readonly queryRepository: QueryRepository){}

    async createUserNeo4j(userInput: UserInput){
        const {nickname, email, password, language, country} = userInput;
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = await this.queryRepository
        .initQuery()
        .raw(
            `CREATE (user:User {nickname: "${nickname}", email: "${email}", password: "${hashedPassword}", language: "${language}", country: "${country}"})
        return user`,
        )
        .run();
        if (query?.length > 0) {
            const {
              user: { identity, properties },
            } = query[0];
            return {
              id: identity,
              ...properties,
            };
          }
    }

    async getUserNeo4j(id: number): Promise<User>{
      const query = await this.queryRepository
      .initQuery()
      .raw(
        `MATCH (user: User)
        WHERE ID(user) = ${id}
        RETURN user`,
      )
      .run();
      
      if (query?.length > 0) {
        const {
          user: { identity, properties },
        } = query[0];
        return {
          id: identity,
          ...properties,
        };
      }
    }
}
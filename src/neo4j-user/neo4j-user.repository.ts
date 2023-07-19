import { Injectable } from '@nestjs/common';
import { QueryRepository } from 'src/neo4j/query.repository';
import { User, UserInput } from 'src/schema/graphql';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class Neo4jUserRepository {
  constructor(private readonly queryRepository: QueryRepository) {}

  async createUserNeo4j(userInput: UserInput) {
    const { nickname, email, password, language, country } = userInput;
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
  async addFriend(emailUser1: string, emailUser2: string): Promise<boolean>{
    await this.queryRepository
      .initQuery()
      .raw(
        `MATCH (user1:User {email: "${emailUser1}"}), (user2:User {email: "${emailUser2}"})
        CREATE (user1)-[:FRIEND]->(user2)
        RETURN user1
        `,
      )
      .run();
      return true;
  }

  async getUserNeo4j(email: string): Promise<User> {
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `MATCH (user: User {email: "${email}"})
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

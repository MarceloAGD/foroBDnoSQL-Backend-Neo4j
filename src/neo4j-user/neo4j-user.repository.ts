import { Injectable } from '@nestjs/common';
import { QueryRepository } from 'src/neo4j/query.repository';
import { Community, User, UserInput } from 'src/schema/graphql';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class Neo4jUserRepository {
  constructor(private readonly queryRepository: QueryRepository) {}

  async createUserNeo4j(userInput: UserInput) {
    const { nickname, email, password, language, country } = userInput;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Verificar si ya existe un usuario con el mismo correo electrónico
    const userExists = await this.queryRepository
      .initQuery()
      .raw(
        `
        MATCH (user:User {email: "${email}"})
        RETURN user
        `,
      )
      .run();
  
    if (userExists?.length > 0) {
      throw new Error('El usuario con este correo electrónico ya existe.');
    }
  
    // Si no existe, crear el nuevo usuario
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `CREATE (user:User {nickname: "${nickname}", email: "${email}", password: "${hashedPassword}", language: "${language}", country: "${country}"})
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
  async addFriend(emailUser1: string, emailUser2: string): Promise<boolean> {
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `MATCH (user1:User {email: "${emailUser1}"}), (user2:User {email: "${emailUser2}"})
        WHERE NOT EXISTS((user1)-[:FRIEND]->(user2))
        CREATE (user1)-[:FRIEND]->(user2)
        CREATE (user2)-[:FRIEND]->(user1)  
        RETURN user1, user2`,
      )
      .run();
     return !!query// Returns true if the query result is truthy (non-null).
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
    } else {
      throw new Error('Usuario no encontrado.'); // Lanzar una excepción si no se encontró el usuario
    }
  }

  async getFriendsNeo4j(email: string): Promise<User[]> {
    const query = await this.queryRepository
    .initQuery()
    .raw(
      `MATCH (user1:User {email: $email})-[:FRIEND]->(friend:User)-[:FRIEND]->(friendOfFriend:User)
      WHERE friendOfFriend <> user1  
      RETURN DISTINCT friendOfFriend`,
      {email}
    )
    .run();

  if (query?.length > 0) {
    return query.map((result: any) => {
      const {
        friendOfFriend: { identity, properties },
      } = result;
      return {
        id: identity,
        ...properties,
      };
    });
  }

  return [];
  }
}

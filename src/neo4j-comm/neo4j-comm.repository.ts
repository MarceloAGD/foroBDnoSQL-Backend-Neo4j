import { Injectable } from '@nestjs/common';
import { QueryRepository } from 'src/neo4j/query.repository';
import { CommInput, Community } from 'src/schema/graphql';

@Injectable()
export class Neo4jCommRepository {
  constructor(private readonly queryRepository: QueryRepository) {}

  async createCommNeo4j(commInput: CommInput): Promise<Community>{
    const { name, author, description, tag } = commInput;
  
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `
        MERGE (comm:Community {name: "${name}", description: "${description}"})
        WITH comm
        UNWIND $tags AS tagObj
        MERGE (t:Tag {name: tagObj})
        MERGE (comm)-[:HAS_TAG]->(t)
        MERGE (t)-[:TAGGED_COMM]->(comm)
        WITH comm
        MATCH (author: User {email: "${author}"})
        MERGE (author)-[:AUTHOR]->(comm)
        MERGE (comm)-[:AUTHOR_BY]->(author)  
        RETURN comm
        `,
        { tags: tag },
      )
      .run();
  
    if (query?.length > 0) {
      const {
        comm: { identity, properties },
      } = query[0];
      return {
        id: identity,
        ...properties,
      };
    }
  }

  async addMemberNeo4j(email: string, comm: string): Promise<boolean> {
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `MATCH (user:User {email: "${email}"}), (comm:Community {name: "${comm}"})
        MERGE (user)-[:MEMBER]->(comm)
        MERGE (comm)-[:MEMBER_BY]->(user)  
        RETURN user, comm`,
      )
      .run();
      
     return !!query// Returns true if the query result is truthy (non-null).
  }

  async deleteCommNeo4j(name: string): Promise<boolean> {
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `MATCH (n:Community {name: "${name}"})
        DETACH DELETE n`,
      )
      .run();
      
     return !!query// Returns true if the query result is truthy (non-null).
  }

  async getCommFriendsNeo4j(email: string): Promise<Community[]> {
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `MATCH (user:User {email: $email})-[:FRIEND]-(friend:User)
        OPTIONAL MATCH (friend)-[:AUTHOR]->(comm:Community)
        RETURN COLLECT(DISTINCT comm) AS communities`,
        { email }
      )
      .run();
  
    if (query?.length > 0) {
      return query[0].communities.map((community: any) => {
        const {
          identity,
          properties
        } = community;
        return {
          id: identity,
          ...properties,
        };
      });
    }
  
    return [];
  }

}
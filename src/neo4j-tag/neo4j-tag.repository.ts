import { Injectable } from '@nestjs/common';
import { QueryRepository } from 'src/neo4j/query.repository';
import { Tag } from 'src/schema/graphql';

@Injectable()
export class Neo4jTagRepository {
  constructor(private readonly queryRepository: QueryRepository) {}

  async createTagNeo4j(name: string){
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `
        CREATE (tag:Tag {name: "${name}"})
        RETURN tag
        `,
      )
      .run();
      if (query?.length > 0) {
        const {
          tag: { identity, properties },
        } = query[0];
        return {
          id: identity,
          ...properties,
        };
      }
  }
}
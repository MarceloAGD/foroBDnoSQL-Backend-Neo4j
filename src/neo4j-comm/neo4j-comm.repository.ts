import { Injectable } from '@nestjs/common';
import { QueryRepository } from 'src/neo4j/query.repository';

@Injectable()
export class Neo4jCommRepository {
  constructor(private readonly queryRepository: QueryRepository) {}

  async createCommNeo4j(name: string){
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `
        CREATE (comm:Comm {name: "${name}"})
        RETURN comm
        `,
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
}
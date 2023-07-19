import { Injectable } from '@nestjs/common';
import { QueryRepository } from 'src/neo4j/query.repository';

@Injectable()
export class Neo4jPostRepository {
  constructor(private readonly queryRepository: QueryRepository) {}

  async createPostNeo4j(title: string){
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `
        CREATE (post:Post {name: "${title}"})
        RETURN post
        `,
      )
      .run();
      if (query?.length > 0) {
        const {
          post: { identity, properties },
        } = query[0];
        return {
          id: identity,
          ...properties,
        };
      }
  }
}
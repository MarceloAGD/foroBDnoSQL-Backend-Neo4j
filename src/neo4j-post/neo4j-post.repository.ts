import { Injectable } from '@nestjs/common';
import { QueryRepository } from 'src/neo4j/query.repository';
import { Post, PostInput } from 'src/schema/graphql';

@Injectable()
export class Neo4jPostRepository {
  constructor(private readonly queryRepository: QueryRepository) {}

  async createPostNeo4j(postInput: PostInput): Promise<Post>{
    const { title, tag } = postInput;
  
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `
        MERGE (post:Post {title: "${title}"})
        WITH post
        UNWIND $tags AS tag
        MERGE (t:Tag {name: tag.name})
        MERGE (post)-[:HAS_TAG]->(t)
        MERGE (t)-[:TAGGED_POST]->(post)
        RETURN post
        `,
        { tags: tag },
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
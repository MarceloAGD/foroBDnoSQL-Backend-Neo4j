import { Injectable } from '@nestjs/common';
import { QueryRepository } from 'src/neo4j/query.repository';
import { Post, PostInput } from 'src/schema/graphql';

@Injectable()
export class Neo4jPostRepository {
  constructor(private readonly queryRepository: QueryRepository) {}

  async createPostNeo4j(postInput: PostInput): Promise<Post> {
    const { id, title, description, tag } = postInput;

    const query = await this.queryRepository
      .initQuery()
      .raw(
        `
        CREATE (post:Post {id: "${id}",title: "${title}", description: "${description}"})
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

  async addLikePostNeo4j(postId: string, email: string): Promise<Post> {
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `
        MATCH (post:Post {id: "${postId}"}), (user:User {email: "${email}"})
        OPTIONAL MATCH (post)-[dislikedRel:DISLIKED_BY]->(user)
        DELETE dislikedRel
        WITH post, user
        OPTIONAL MATCH (user)-[dislikedRel:DISLIKED]->(post)
        DELETE dislikedRel
        WITH post, user
        MERGE (post)-[:LIKED_BY]->(user)
        MERGE (user)-[:LIKED]->(post)
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
  async addDislikePostNeo4j(postId: string, email: string): Promise<Post> {
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `
        MATCH (post:Post {id: "${postId}"}), (user:User {email: "${email}"})
        OPTIONAL MATCH (post)-[likedRel:LIKED_BY]->(user)
        DELETE likedRel
        WITH post, user
        OPTIONAL MATCH (user)-[likedRel:LIKED]->(post)
        DELETE likedRel
        WITH post, user
        MERGE (post)-[:DISLIKED_BY]->(user)
        MERGE (user)-[:DISLIKED]->(post)
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

  async likeVerificator(postId: string, email: string): Promise<boolean> {
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `
      MATCH (post:Post {id: "${postId}"}), (user:User {email: "${email}"})
      OPTIONAL MATCH (post)-[likedRel:LIKED_BY]->(user)
      RETURN likedRel
      `,
      )
      .run();

    if (query?.length > 0 && query[0].likedRel !== null) {
      return true;
    } else {
      return false;
    }
  }

  async dislikeVerificator(postId: string, email: string): Promise<boolean> {
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `
      MATCH (post:Post {id: "${postId}"}), (user:User {email: "${email}"})
      OPTIONAL MATCH (post)-[dislikedRel:DISLIKED_BY]->(user)
      RETURN dislikedRel
      `,
      )
      .run();

      if (query?.length > 0 && query[0].dislikedRel !== null) {
        return true;
      } else {
        return false;
      }
  }
  
  async eliminatedLike(postId: string, email: string): Promise<Post> {
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `
      MATCH (post:Post {id: "${postId}"}), (user:User {email: "${email}"})
      OPTIONAL MATCH (post)-[likedRel:LIKED_BY]->(user)
      DELETE likedRel
      WITH post, user
      OPTIONAL MATCH (user)-[likedRel:LIKED]->(post)
      DELETE likedRel
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

  async eliminatedDislike(postId: string, email: string): Promise<Post> {
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `
      MATCH (post:Post {id: "${postId}"}), (user:User {email: "${email}"})
      OPTIONAL MATCH (post)-[dislikedRel:DISLIKED_BY]->(user)
      DELETE dislikedRel
      WITH post, user
      OPTIONAL MATCH (user)-[dislikedRel:DISLIKED]->(post)
      DELETE dislikedRel
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

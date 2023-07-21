import { Injectable } from '@nestjs/common';
import { QueryRepository } from 'src/neo4j/query.repository';
import { Post, PostInput } from 'src/schema/graphql';


@Injectable()
export class Neo4jPostRepository {
  constructor(private readonly queryRepository: QueryRepository) {}

  async createPostNeo4j(postInput: PostInput): Promise<Post> {   
    if(postInput.comm == null){
      postInput.comm = "general";
    }
    const { id, title,author, description, comm, tag } = postInput;

    const query = await this.queryRepository
      .initQuery()
      .raw(
        `
        CREATE (post:Post {id: "${id}",title: "${title}",comm: "${comm}", description: "${description}"})
        MERGE (comm: Community {name: "${comm}"})
        MERGE (post)-[:BELONG]->(comm)
        MERGE (comm)-[:BELONG_TO]->(post)
        WITH post
        UNWIND $tags AS tag
        MERGE (t:Tag {name: tag.name})
        MERGE (post)-[:HAS_TAG]->(t)
        MERGE (t)-[:TAGGED_POST]->(post)
        WITH post
        MATCH (author: User {email: "${author}"})
        MERGE (author)-[:AUTHOR]->(post)
        MERGE (post)-[:AUTHOR_BY]->(author)  
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

  async deletePostNeo4j(postId: string): Promise<boolean>{
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `
        MATCH (n:Post {id: "${postId}"})
        DETACH DELETE n
      `,
      )
      .run();
      return !!query
  }

  async getPostSameTagsNeo4j(postId: string): Promise<Post[]> {
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `
        MATCH (post:Post)-[:HAS_TAG]->(tag:Tag)
        WHERE post.id = "${postId}"
        WITH COLLECT(DISTINCT tag.name) AS tags
        MATCH (otherPost:Post)-[:HAS_TAG]->(otherTag:Tag)
        WHERE otherPost.id <> "${postId}" AND otherTag.name IN tags
        RETURN otherPost
        `,
      )
      .run();
  
    if (query?.length > 0) {
      return query.map((result) => {
        const {
          otherPost: { identity, properties },
        } = result;
        return {
          id: identity,
          ...properties,
        };
      });
    }
  
    return [];
  }

  async getRecommendedPostsNeo4j(email: string): Promise<Post[]> {
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `
        MATCH (user:User {email: "${email}"})-[:LIKED]->(likedPost:Post)-[:HAS_TAG]->(tag:Tag)<-[:HAS_TAG]-(recommendedPost:Post)
        WHERE NOT (user)-[:LIKED]->(recommendedPost)
        RETURN recommendedPost
        `,
      )
      .run();
  
    if (query?.length > 0) {
      const recommendedPosts = query.map((record) => {
        const {
          recommendedPost: { identity, properties },
        } = record;
        return {
          id: identity,
          ...properties,
        };
      });
      return recommendedPosts;
    }
  
    return [];
  }
  
}


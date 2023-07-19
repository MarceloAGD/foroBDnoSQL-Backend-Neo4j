import { Module } from '@nestjs/common';
import { Neo4jPostService } from './neo4j-post.service';
import { Neo4jPostResolver } from './neo4j-post.resolver';
import { Neo4jPostRepository } from './neo4j-post.repository';

@Module({
  providers: [Neo4jPostService, Neo4jPostResolver, Neo4jPostRepository],
  exports: [Neo4jPostRepository]
})
export class Neo4jPostModule {}

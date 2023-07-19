import { Module } from '@nestjs/common';
import { Neo4jPostService } from './neo4j-post.service';
import { Neo4jPostResolver } from './neo4j-post.resolver';

@Module({
  providers: [Neo4jPostService, Neo4jPostResolver]
})
export class Neo4jPostModule {}

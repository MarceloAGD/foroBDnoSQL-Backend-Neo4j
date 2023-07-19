import { Module } from '@nestjs/common';
import { Neo4jTagService } from './neo4j-tag.service';
import { Neo4jTagResolver } from './neo4j-tag.resolver';
import { Neo4jTagRepository } from './neo4j-tag.repository';

@Module({
  providers: [Neo4jTagService, Neo4jTagResolver, Neo4jTagRepository],
  exports: [Neo4jTagRepository]
})
export class Neo4jTagModule {}

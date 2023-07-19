import { Module } from '@nestjs/common';
import { Neo4jTagService } from './neo4j-tag.service';
import { Neo4jTagResolver } from './neo4j-tag.resolver';

@Module({
  providers: [Neo4jTagService, Neo4jTagResolver]
})
export class Neo4jTagModule {}

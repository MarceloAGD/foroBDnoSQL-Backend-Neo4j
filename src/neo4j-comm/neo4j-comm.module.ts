import { Module } from '@nestjs/common';
import { Neo4jCommService } from './neo4j-comm.service';
import { Neo4jCommResolver } from './neo4j-comm.resolver';

@Module({
  providers: [Neo4jCommService, Neo4jCommResolver]
})
export class Neo4jCommModule {}

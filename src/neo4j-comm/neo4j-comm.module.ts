import { Module } from '@nestjs/common';
import { Neo4jCommService } from './neo4j-comm.service';
import { Neo4jCommResolver } from './neo4j-comm.resolver';
import { Neo4jCommRepository } from './neo4j-comm.repository';

@Module({
  providers: [Neo4jCommService, Neo4jCommResolver, Neo4jCommRepository],
  exports: [Neo4jCommRepository]
})
export class Neo4jCommModule {}

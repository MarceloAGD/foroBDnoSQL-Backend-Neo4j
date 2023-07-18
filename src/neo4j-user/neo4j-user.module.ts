import { Module } from '@nestjs/common';
import { Neo4jUserResolver } from './neo4j-user.resolver';
import { Neo4jUserService } from './neo4j-user.service';
import { Neo4jUserRepository } from './neo4j-user.repository';

@Module({
  providers: [Neo4jUserResolver, Neo4jUserService, Neo4jUserRepository],
  exports: [Neo4jUserRepository]
})
export class Neo4jUserModule {}

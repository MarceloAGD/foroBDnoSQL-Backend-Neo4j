import { Injectable } from '@nestjs/common';
import { Neo4jCommRepository } from './neo4j-comm.repository';
import { Community } from 'src/schema/graphql';

@Injectable()
export class Neo4jCommService {
    constructor(private readonly commRepository: Neo4jCommRepository){}

    async createCommNeo4j(name: string): Promise<Community>{
        return await this.commRepository.createCommNeo4j(name);
    }
}

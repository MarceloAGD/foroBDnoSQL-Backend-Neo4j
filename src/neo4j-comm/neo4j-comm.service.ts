import { Injectable } from '@nestjs/common';
import { Neo4jCommRepository } from './neo4j-comm.repository';
import { CommInput, Community } from 'src/schema/graphql';

@Injectable()
export class Neo4jCommService {
    constructor(private readonly commRepository: Neo4jCommRepository){}

    async createCommNeo4j(commInput: CommInput): Promise<Community>{
        return await this.commRepository.createCommNeo4j(commInput);
    }
    async addMemberNeo4j(email: string, comm: string): Promise<boolean>{
        return await this.commRepository.addMemberNeo4j(email, comm);
    }
    async deleteCommNeo4j(name: string): Promise<boolean>{
        return await this.commRepository.deleteCommNeo4j(name)
    }
}

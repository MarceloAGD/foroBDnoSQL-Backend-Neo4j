import { Injectable } from '@nestjs/common';
import { Neo4jTagRepository } from './neo4j-tag.repository';
import { Tag } from 'src/schema/graphql';

@Injectable()
export class Neo4jTagService {
    constructor(private readonly tagRepository: Neo4jTagRepository){}

    async createTagNeo4j(name: string): Promise<Tag>{
        return await this.tagRepository.createTagNeo4j(name);
    }
}

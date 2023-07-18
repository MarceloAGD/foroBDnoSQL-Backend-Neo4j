import { Injectable } from '@nestjs/common';
import { Neo4jUserRepository } from './neo4j-user.repository';
import { User, UserInput } from 'src/schema/graphql';

@Injectable()
export class Neo4jUserService {
    constructor(private readonly userRepository: Neo4jUserRepository){}

    async createUserNeo4j(userInput: UserInput): Promise<User>{
        return await this.userRepository.createUserNeo4j(userInput)
    }

    async getUserNeo4j(id: number): Promise<User>{
        return await this.userRepository.getUserNeo4j(id);
    }
}

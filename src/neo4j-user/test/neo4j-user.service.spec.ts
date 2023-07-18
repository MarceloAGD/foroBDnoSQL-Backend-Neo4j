import { Test, TestingModule } from '@nestjs/testing';
import { Neo4jUserService } from '../neo4j-user.service';

describe('Neo4jUserService', () => {
  let service: Neo4jUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Neo4jUserService],
    }).compile();

    service = module.get<Neo4jUserService>(Neo4jUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

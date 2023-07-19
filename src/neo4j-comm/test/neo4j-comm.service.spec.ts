import { Test, TestingModule } from '@nestjs/testing';
import { Neo4jCommService } from '../neo4j-comm.service';

describe('Neo4jCommService', () => {
  let service: Neo4jCommService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Neo4jCommService],
    }).compile();

    service = module.get<Neo4jCommService>(Neo4jCommService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

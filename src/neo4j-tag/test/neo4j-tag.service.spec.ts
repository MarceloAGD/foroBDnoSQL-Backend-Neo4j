import { Test, TestingModule } from '@nestjs/testing';
import { Neo4jTagService } from '../neo4j-tag.service';

describe('Neo4jTagService', () => {
  let service: Neo4jTagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Neo4jTagService],
    }).compile();

    service = module.get<Neo4jTagService>(Neo4jTagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

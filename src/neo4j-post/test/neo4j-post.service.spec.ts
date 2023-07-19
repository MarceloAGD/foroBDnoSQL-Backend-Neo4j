import { Test, TestingModule } from '@nestjs/testing';
import { Neo4jPostService } from '../neo4j-post.service';

describe('Neo4jPostService', () => {
  let service: Neo4jPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Neo4jPostService],
    }).compile();

    service = module.get<Neo4jPostService>(Neo4jPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

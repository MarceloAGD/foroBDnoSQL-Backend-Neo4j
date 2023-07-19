import { Test, TestingModule } from '@nestjs/testing';
import { Neo4jCommResolver } from '../neo4j-comm.resolver';

describe('Neo4jCommResolver', () => {
  let resolver: Neo4jCommResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Neo4jCommResolver],
    }).compile();

    resolver = module.get<Neo4jCommResolver>(Neo4jCommResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

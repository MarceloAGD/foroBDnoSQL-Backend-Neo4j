import { Test, TestingModule } from '@nestjs/testing';
import { Neo4jTagResolver } from '../neo4j-tag.resolver';

describe('Neo4jTagResolver', () => {
  let resolver: Neo4jTagResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Neo4jTagResolver],
    }).compile();

    resolver = module.get<Neo4jTagResolver>(Neo4jTagResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

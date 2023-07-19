import { Test, TestingModule } from '@nestjs/testing';
import { Neo4jPostResolver } from '../neo4j-post.resolver';

describe('Neo4jPostResolver', () => {
  let resolver: Neo4jPostResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Neo4jPostResolver],
    }).compile();

    resolver = module.get<Neo4jPostResolver>(Neo4jPostResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

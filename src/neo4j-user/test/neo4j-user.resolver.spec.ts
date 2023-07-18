import { Test, TestingModule } from '@nestjs/testing';
import { Neo4jUserResolver } from '../neo4j-user.resolver';

describe('Neo4jUserResolver', () => {
  let resolver: Neo4jUserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Neo4jUserResolver],
    }).compile();

    resolver = module.get<Neo4jUserResolver>(Neo4jUserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

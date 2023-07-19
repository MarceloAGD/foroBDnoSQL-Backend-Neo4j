import { Module } from '@nestjs/common';
import { Neo4jModule } from './neo4j/neo4j.module';
import { GraphQLModule } from '@nestjs/graphql';
import { Neo4jUserModule } from './neo4j-user/neo4j-user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {ApolloFederationDriver,ApolloFederationDriverConfig,} from '@nestjs/apollo';
import { upperDirectiveTransformer } from './schema/directives/upper-case.directive';
import { Neo4jTagModule } from './neo4j-tag/neo4j-tag.module';
import { Neo4jPostModule } from './neo4j-post/neo4j-post.module';
import { Neo4jCommModule } from './neo4j-comm/neo4j-comm.module';


@Module({
  imports: [
    Neo4jUserModule,
    Neo4jTagModule,
    Neo4jPostModule,
    Neo4jCommModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['./**/*.graphql'],
      transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
    }),
    Neo4jModule.forRootAsync(),
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get('PORT');
  }
}


import { Module } from '@nestjs/common';
import { Neo4jModule } from './neo4j/neo4j.module';
import { GraphQLModule } from '@nestjs/graphql';
import { Neo4jUserModule } from './neo4j-user/neo4j-user.module';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { upperDirectiveTransformer } from './schema/directives/upper-case.directive';


@Module({
  imports: [
    Neo4jUserModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
    }),
    Neo4jModule.forRootAsync(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}


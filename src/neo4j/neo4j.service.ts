import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import neo4j, { Driver, Session } from 'neo4j-driver';

@Injectable()
export class Neo4jService implements OnModuleInit, OnModuleDestroy {
  private driver: Driver;

  constructor(private readonly scheme: string, private readonly host: string, private readonly port: number, private readonly username: string, private readonly password: string) {}

  async onModuleInit() {
    this.driver = neo4j.driver(`${this.scheme}://${this.host}:${this.port}`, neo4j.auth.basic(this.username, this.password));
  }

  async onModuleDestroy() {
    await this.driver.close();
  }

  session(database?: string): Session {
    return this.driver.session({ database });
  }
}
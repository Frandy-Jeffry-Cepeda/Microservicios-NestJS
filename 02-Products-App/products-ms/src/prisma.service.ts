import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import path from 'path';

type PrismaClientModule = typeof import('../generated/prisma/client');
const { PrismaClient } = require(path.join(
  process.cwd(),
  'generated',
  'prisma',
  'client',
)) as PrismaClientModule;


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const databaseUrl = process.env.DATABASE_URL ?? 'file:./dev.db';
    const adapter = new PrismaLibSql({ url: databaseUrl });
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
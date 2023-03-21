import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';

@Module({
  imports: [ConfigModule],
  providers: [SeedResolver, SeedService]
})
export class SeedModule {}

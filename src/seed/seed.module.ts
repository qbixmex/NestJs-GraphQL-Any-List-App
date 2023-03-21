import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from '../users/users.module';
import { ItemsModule } from '../items/items.module';
import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';

@Module({
  imports: [ ConfigModule, UsersModule, ItemsModule ],
  providers: [SeedResolver, SeedService]
})
export class SeedModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { ItemsModule } from '../items/items.module';
import { ListsModule } from '../lists/lists.module';

@Module({
  providers: [
    UsersResolver,
    UsersService
  ],
  imports: [
    TypeOrmModule.forFeature([ User ]),
    ItemsModule,
    ListsModule,
  ],
  exports: [
    TypeOrmModule,
    UsersService,
  ],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  providers: [
    UsersResolver,
    UsersService
  ],
  imports: [
    TypeOrmModule.forFeature([ User ])
  ],
  exports: [
    // TypeOrmModule,
    UsersService
  ],
})
export class UsersModule {}

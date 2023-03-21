import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ListsService } from './lists.service';
import { ListsResolver } from './lists.resolver';
import { List } from './entities';

@Module({
  providers: [ ListsResolver, ListsService ],
  imports: [
    TypeOrmModule.forFeature([ List ]),
  ],
  exports: [ TypeOrmModule, ListsService ],
})
export class ListsModule {}

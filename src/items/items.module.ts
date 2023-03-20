import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Item } from './entities';
import { ItemsResolver } from './items.resolver';
import { ItemsService } from './items.service';


@Module({
  providers: [
    ItemsResolver,
    ItemsService
  ],
  imports: [
    TypeOrmModule.forFeature([ Item ]),
  ]
})
export class ItemsModule {}

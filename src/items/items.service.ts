import { Injectable } from '@nestjs/common';

import { Item } from './entities/item.entity';
import { CreateItemInput, UpdateItemInput } from './dto';

@Injectable()
export class ItemsService {
  findAll(): Item[] {
    return [];
  }

  findOne(id: number): Item {
    return {
      id: 'sa858s8',
      name: 'Rice',
      quantity: 5,
      quantityUnits: 'kg'
    };
  }

  create(createItemInput: CreateItemInput): Item {
    return {
      id: 'sa858s8',
      name: 'Rice',
      quantity: 5,
      quantityUnits: 'kg'
    };
  }

  update(id: number, updateItemInput: UpdateItemInput): Item {
    
    return {
      id: 'sa858s8',
      name: 'Rice',
      quantity: 5,
      quantityUnits: 'kg'
    };
  }

  remove(id: number): boolean {
    console.log({ id });
    return true;
  }
}

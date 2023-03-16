import { Injectable } from '@nestjs/common';
import { CreateItemInput, UpdateItemInput } from './dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  findAll(): Item[] {
    return [];
  }

  findOne(id: number): Item {
    return {
      exampleField: id
    };
  }

  create(createItemInput: CreateItemInput): Item {
    console.log({ createItemInput });
    return { exampleField: 1 };
  }

  update(id: number, updateItemInput: UpdateItemInput): Item {
    console.log({ updateItemInput });
    return { exampleField: 1 };
  }

  remove(id: number): boolean {
    console.log({ id });
    return true;
  }
}

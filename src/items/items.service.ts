import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Item } from './entities/item.entity';
import { CreateItemInput } from './dto';

@Injectable()
export class ItemsService {

  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
  ){}

  async findAll(): Promise<Item[]> {
    // TODO: Paginate
    // TODO: Filter
    return await this.itemsRepository.find();
  }

  async findOne(id: string): Promise<Item> {
    const item = await this.itemsRepository.findOneBy({ id });
    if (!item)
      throw new NotFoundException(`Item with id: ${id} not found!`);
    return item;
  }

  async create(createItemInput: CreateItemInput): Promise<Item> {
    const newItem = this.itemsRepository.create(createItemInput);
    return await this.itemsRepository.save(newItem);
  }

  // async update(id: number, updateItemInput: UpdateItemInput): Promise<Item> {
    
  //   return {
  //     id: 'sa858s8',
  //     name: 'Rice',
  //     quantity: 5,
  //     quantityUnits: 'kg'
  //   };
  // }

  // async remove(id: number): Promise<boolean> {
  //   console.log({ id });
  //   return true;
  // }
}

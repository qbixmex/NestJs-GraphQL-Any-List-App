import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Item } from './entities/item.entity';
import { CreateItemInput, UpdateItemInput } from './dto';

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

  async update(updateItemInput: UpdateItemInput): Promise<Item> {
    const { id } = updateItemInput;
    const item = await this.itemsRepository.preload(updateItemInput);

    if (!item)
      throw new NotFoundException(`Item with id: (${id}) not found!`);

    return this.itemsRepository.save(item);
  }

  async remove(id: string): Promise<Item> {
    // TODO: soft delete, reference integrity
    const item = await this.findOne(id);
    await this.itemsRepository.remove(item);
    return { ...item, id };
  }
}

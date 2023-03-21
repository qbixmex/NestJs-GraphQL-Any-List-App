import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Item } from './entities';
import { CreateItemInput, UpdateItemInput } from './dto';
import { User } from '../users/entities';

@Injectable()
export class ItemsService {

  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
  ){}

  async findAll(userId: string): Promise<Item[]> {
    // TODO: Paginate
    // TODO: Filter
    return await this.itemsRepository.find({
      where: {
        user: {
          id: userId
        }
      }
    });
  }

  async findOne( itemId: string, userId: string ): Promise<Item> {
    const item = await this.itemsRepository.findOneBy({
      id: itemId,
      user: {
        id: userId
      }
    });
    if (!item) {
      throw new NotFoundException(`Item with id: [${itemId}] not found!`);
    }
    return item;
  }

  async create(
    createItemInput: CreateItemInput,
    user: User
  ): Promise<Item> {
    const newItem = this.itemsRepository.create({ ...createItemInput, user });
    return await this.itemsRepository.save(newItem);
  }

  async update(
    updateItemInput: UpdateItemInput,
    userId: string
  ): Promise<Item> {

    const { id } = updateItemInput;
    await this.findOne(id, userId);

    const item = await this.itemsRepository.preload(updateItemInput);

    //? Alternative
    //? const item = await this.itemsRepository.preload({ updateItemInput, userObject });

    if (!item) {
      throw new NotFoundException(`Item with id: (${id}) not found!`);
    }

    return this.itemsRepository.save(item);
  }

  async remove(id: string, userId: string): Promise<Item> {
    // TODO: soft delete, reference integrity
    const item = await this.findOne(id, userId);
    await this.itemsRepository.remove(item);
    return { ...item, id };
  }
}

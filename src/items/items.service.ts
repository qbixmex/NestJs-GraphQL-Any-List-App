import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Item } from './entities';
import { CreateItemInput, UpdateItemInput } from './dto';
import { User } from '../users/entities';
import { PaginationArgs, SearchArgs } from '../common/dto';

@Injectable()
export class ItemsService {

  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
  ){}

  async findAll(
    userId: string,
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs,
  ): Promise<Item[]> {

    const { limit, offset } = paginationArgs;
    const { search } = searchArgs;

    const queryBuilder = this.itemsRepository.createQueryBuilder()
      .take(limit)
      .skip(offset)
      .where(`"userId" = :userId`, { userId });

    if (search) {
      queryBuilder.andWhere(
        'LOWER(name) like :name',
        { name: `%${ search.toLowerCase() }%` }
      );
    }

    return queryBuilder.getMany();
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

  async itemsCountByUser( userId: string ): Promise<number> {
    return await this.itemsRepository.count({
      where: {
        user: { id: userId }
      }
    });
  }
}

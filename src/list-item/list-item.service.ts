import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateListItemInput, UpdateListItemInput } from './dto';
import { PaginationArgs, SearchArgs } from '../common/dto';
import { List } from '../lists/entities';
import { ListItem } from './entities';

@Injectable()
export class ListItemService {

  constructor(
    @InjectRepository(ListItem)
    private readonly listItemRepository: Repository<ListItem>
  ) {}

  async create(createListItemInput: CreateListItemInput): Promise<ListItem> {

    const { itemId, listId, ...rest } = createListItemInput;

    const newListItem = this.listItemRepository.create({
      ...rest,
      item: { id: itemId },
      list: { id: listId },
    });

    return this.listItemRepository.save(newListItem);

  }

  async findAll(
    list: List,
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs,
  ): Promise<ListItem[]> {

    const { offset, limit } = paginationArgs;
    const { search } = searchArgs;

    const queryBuilder = this.listItemRepository.createQueryBuilder('listItem')
      .innerJoin('listItem.item', 'item')
      .take(limit)
      .skip(offset)
      .where(`"listId" = :listId`, { listId: list.id });

    if (search) {
      queryBuilder.andWhere(
        'LOWER(item.name) like :name',
        { name: `%${ search.toLowerCase() }%` }
      )
    }

    return queryBuilder.getMany();
    
  }

  async findOne(id: string): Promise<ListItem> {
    const listItem = await this.listItemRepository.findOneBy({ id });
    if (!listItem) {
      throw new NotFoundException(`List Item with id: [${id}] not found!`);
    }
    return listItem;
  }

  async update(
    updateListItemInput: UpdateListItemInput
  ): Promise<ListItem> {
    throw new Error('Update not implemented yet!');
  }

  async remove(id: string): Promise<ListItem> {
    throw new Error('Delete not implemented yet!');
  }

  async listItemsCountByList(listId: string): Promise<number> {
    return await this.listItemRepository.count({
      where: {
        list: { id: listId }
      }
    });
  }
}

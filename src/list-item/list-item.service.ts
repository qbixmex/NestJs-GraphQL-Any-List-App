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

    await this.listItemRepository.save(newListItem);

    return this.findOne(newListItem.id);

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

    const { id, listId, itemId, ...rest } = updateListItemInput;

    const queryBuilder = this.listItemRepository.createQueryBuilder()
      .update()
      .set(rest)
      .where('id = :id', { id });

    if (listId) queryBuilder.set({ list: { id: listId }});
    if (itemId) queryBuilder.set({ item: { id: itemId }});

    //* Perform to update list item
    await queryBuilder.execute();

    return this.findOne(id);

  }

  async remove(id: string): Promise<ListItem> {
    const listItem = await this.findOne(id);
    await this.listItemRepository.remove(listItem);
    return { ...listItem, id };
  }

  async listItemsCountByList(listId: string): Promise<number> {
    return await this.listItemRepository.count({
      where: {
        list: { id: listId }
      }
    });
  }
}

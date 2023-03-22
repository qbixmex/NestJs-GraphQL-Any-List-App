import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateListItemInput, UpdateListItemInput } from './dto';
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

  async findAll(): Promise<ListItem[]> {
    throw new Error('Find All not implemented yet!');
  }

  async findOne(id: string): Promise<ListItem> {
    throw new Error('Find One not implemented yet!');
  }

  async update(
    updateListItemInput: UpdateListItemInput
  ): Promise<ListItem> {
    throw new Error('Update not implemented yet!');
  }

  async remove(id: string): Promise<ListItem> {
    throw new Error('Delete not implemented yet!');
  }
}

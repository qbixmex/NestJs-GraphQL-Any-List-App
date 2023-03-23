import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../users/entities';
import { Item } from '../items/entities';
import { List } from '../lists/entities';
import { ListItem } from '../list-item/entities';

import { UsersService } from '../users/users.service';
import { ItemsService } from '../items/items.service';
import { ListsService } from '../lists/lists.service';
import { ListItemService } from '../list-item/list-item.service';

import { SEED_USERS, SEED_ITEMS, SEED_LISTS } from './data';

@Injectable()
export class SeedService {

  private isProd: boolean;

  constructor(

    private readonly configService: ConfigService,

    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,

    @InjectRepository(List)
    private readonly listRepository: Repository<List>,

    @InjectRepository(ListItem)
    private readonly listItemRepository: Repository<ListItem>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly usersService: UsersService,

    private readonly itemsService: ItemsService,

    private readonly listService: ListsService,

    private readonly listItemService: ListItemService,

  ) {
    this.isProd = this.configService.get('STATE') == 'prod';
  }

  async executeSeed(): Promise<boolean> {

    //* Validation
    if ( this.isProd ) {
      throw new UnauthorizedException('We cannot run SEED on Production!');
    }

    // Clear Database
    await this.deleteDatabase();

    //* Create Users
    const user = await this.loadUsers();

    //* Create Items
    await this.loadItems(user);

    //* Create Items
    const list = await this.loadLists(user);

    //* Create listItems
    const items = await this.itemsService.findAll(user.id, { offset: 0, limit: 10 }, {});
    await this.loadListItems(list, items);

    return true;
  }

  async deleteDatabase(): Promise<void> {
    //* List Items
    await this.listItemRepository.createQueryBuilder()
      .delete()
      .where({})
      .execute();

    //* Lists
    await this.listRepository.createQueryBuilder()
      .delete()
      .where({})
      .execute();

    //* Delete Items
    await this.itemsRepository.createQueryBuilder()
      .delete()
      .where({})
      .execute();

    // Delete Users
    await this.usersRepository.createQueryBuilder()
      .delete()
      .where({})
      .execute();
  }

  async loadUsers(): Promise<User> {

    const users = [];

    for (const user of SEED_USERS) {
      users.push(await this.usersService.create(user));
    }

    return users[0];

  }

  async loadItems( user: User ): Promise<void> {

    const itemsPromises: Promise<Item>[] = [];

    for (const item of SEED_ITEMS) {
      itemsPromises.push(this.itemsService.create(item, user));
    }

    await Promise.all(itemsPromises);

  }

  async loadLists( user: User ): Promise<List> {

    const lists = [];

    for (const list of SEED_LISTS) {
      lists.push(await this.listService.create(list, user));
    }

    return lists[0];

  }

  async loadListItems(list: List, items: Item[]): Promise<void> {
    for (const item of items) {
      this.listItemService.create({
        quantity: Math.round(Math.random() * 10) + 1,
        completed: Math.round(Math.random() * 1) === 0 ? false : true,
        listId: list.id,
        itemId: item.id
      })
    }
  }

}

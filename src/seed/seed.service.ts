import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Item } from '../items/entities';
import { User } from '../users/entities';
import { UsersService } from '../users/users.service';
import { ItemsService } from '../items/items.service';
import { SEED_USERS, SEED_ITEMS } from './data';

@Injectable()
export class SeedService {

  private isProd: boolean;

  constructor(

    private readonly configService: ConfigService,

    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly usersService: UsersService,

    private readonly itemsService: ItemsService,

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

    return true;
  }

  async deleteDatabase(): Promise<void> {
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

}

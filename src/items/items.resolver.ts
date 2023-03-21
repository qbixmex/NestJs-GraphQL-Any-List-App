import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';

import { Item } from './entities';
import { CreateItemInput, UpdateItemInput } from './dto';
import { JwtAuthGuard } from '../auth/guards';
import { ItemsService } from './items.service';
import { PaginationArgs, SearchArgs } from '../common/dto';
import { CurrentUser } from '../auth/decorators';
import { User } from '../users/entities';

@Resolver(() => Item)
@UseGuards( JwtAuthGuard )
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Query(() => [Item], {
    name: 'getItems',
    description: 'Get all items'
  })
  async findAll(
    @CurrentUser() user: User,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<Item[]> {
    return await this.itemsService.findAll(user.id, paginationArgs, searchArgs);
  }

  @Query(() => Item, {
    name: 'getItem',
    description: 'Get a single item with given id'
  })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser() user: User
  ): Promise<Item> {
    return await this.itemsService.findOne(id, user.id);
  }

  @Mutation(() => Item, {
    name: 'createItem',
    description: 'Create a new item'
  })
  async createItem(
    @Args('createItemInput') createItemInput: CreateItemInput,
    @CurrentUser() user: User
  ): Promise<Item> {
    return await this.itemsService.create(createItemInput, user);
  }

  @Mutation(() => Item, {
    name: 'updateItem',
    description: 'Update item from given id'
  })
  async updateItem(
    @Args('updateItemInput') updateItemInput: UpdateItemInput,
    @CurrentUser() user: User
  ): Promise<Item> {
    return await this.itemsService.update(updateItemInput, user.id);
  }

  @Mutation(() => Item, {
    name: 'removeItem',
    description: 'Remove item from given id'
  })
  async removeItem(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser() user: User
  ): Promise<Item> {
    return await this.itemsService.remove(id, user.id);
  }
}

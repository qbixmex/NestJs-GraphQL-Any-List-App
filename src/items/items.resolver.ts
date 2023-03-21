import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';

import { Item } from './entities';
import { CreateItemInput, UpdateItemInput } from './dto';
import { JwtAuthGuard } from '../auth/guards';
import { ItemsService } from './items.service';
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
    @CurrentUser() user: User
  ): Promise<Item[]> {
    return await this.itemsService.findAll(user);
  }

  @Query(() => Item, {
    name: 'getItem',
    description: 'Get a single item with given id'
  })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,    
  ): Promise<Item> {
    return await this.itemsService.findOne(id);
  }

  @Mutation(() => Item, {
    name: 'createItem',
    description: 'Create a new item'
  })
  async createItem(
    @Args('createItemInput') createItemInput: CreateItemInput,
    @CurrentUser() user: User
  ): Promise<Item> {
    console.log(user);
    return await this.itemsService.create(createItemInput, user);
  }

  @Mutation(() => Item, {
    name: 'updateItem',
    description: 'Update item from given id'
  })
  async updateItem(
    @Args('updateItemInput') updateItemInput: UpdateItemInput
  ): Promise<Item> {
    return await this.itemsService.update(updateItemInput);
  }

  @Mutation(() => Item)
  async removeItem(
    @Args('id', { type: () => ID }) id: string
  ): Promise<Item> {
    return await this.itemsService.remove(id);
  }
}

import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';

import { ListItemService } from './list-item.service';

import { JwtAuthGuard } from '../auth/guards';

import { CreateListItemInput, UpdateListItemInput } from './dto';
import { ListItem } from './entities';

@Resolver(() => ListItem)
@UseGuards( JwtAuthGuard)
export class ListItemResolver {

  constructor(private readonly listItemService: ListItemService) {}

  @Mutation(() => ListItem, {
    name: 'createListItem',
    description: 'Create a new List Item'
  })
  async createListItem(
    @Args('createListItemInput') createListItemInput: CreateListItemInput
  ): Promise<ListItem> {    
    return await this.listItemService.create(createListItemInput);
  }

  @Query(() => ListItem, {
    name: 'findOneListItem',
    description: 'Find one list item with given id',
  })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string
  ): Promise<ListItem> {
    return await this.listItemService.findOne(id);
  }

  @Mutation(() => ListItem)
  async updateListItem(
    @Args('updateListItemInput') updateListItemInput: UpdateListItemInput
  ): Promise<ListItem> {
    return await this.listItemService.update(updateListItemInput);
  }

  @Mutation(() => ListItem)
  async removeListItem(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string
  ): Promise<ListItem> {
    return this.listItemService.remove(id);
  }
}

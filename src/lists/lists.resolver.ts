import { UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards';

import { List } from './entities';
import { User } from '../users/entities';

import { ListsService } from './lists.service';
import { CreateListInput, UpdateListInput } from './dto';
import { CurrentUser } from '../auth/decorators';
import { PaginationArgs, SearchArgs } from '../common/dto';

@Resolver(() => List)
@UseGuards( JwtAuthGuard )
export class ListsResolver {

  constructor(private readonly listsService: ListsService) {}

  @Query(() => [List], {
    name: 'getLists',
    description: 'Get all lists'
  })
  async findAll(
    @CurrentUser() user: User,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<List[]> {
    return await this.listsService.findAll(
      user.id,
      paginationArgs,
      searchArgs
    );
  }

  @Query(() => List, {
    name: 'getList',
    description: 'Get single list with provided id'
  })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe ) id: string,
    @CurrentUser() user: User
  ): Promise<List> {
    return await this.listsService.findOne(id, user.id);
  }

  @Mutation(() => List, {
    name: 'createList',
    description: 'Create a new List'
  })
  async createList(
    @Args('createListInput') createListInput: CreateListInput,
    @CurrentUser() user: User
  ) {
    return await this.listsService.create(createListInput, user);
  }

  @Mutation(() => List, {
    name: 'updateList',
    description: 'Update list from given id'
  })
  async updateList(
    @Args('updateListInput') updateListInput: UpdateListInput,
    @CurrentUser() user: User
  ): Promise<List> {
    return this.listsService.update(
      updateListInput, user.id
    );
  }

  @Mutation(() => List, {
    name: 'removeList',
    description: 'Remove list from given id'
  })
  async removeList(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser() user: User
  ): Promise<List> {
    return await this.listsService.remove(id, user.id);
  }
}

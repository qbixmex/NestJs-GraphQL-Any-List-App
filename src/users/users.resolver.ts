import { Resolver, Query, Mutation, Args, ID, ResolveField, Int, Parent } from '@nestjs/graphql';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { ValidRolesArgs, UpdateUserInput } from './dto';
import { JwtAuthGuard } from '../auth/guards';

import { User } from './entities';
import { Item } from '../items/entities';
import { CurrentUser } from '../auth/decorators';
import { ValidRoles } from '../auth/enums';
import { ItemsService } from '../items/items.service';
import { ListsService } from '../lists/lists.service';
import { PaginationArgs, SearchArgs } from '../common/dto';

@Resolver(() => User)
@UseGuards( JwtAuthGuard )
export class UsersResolver {

  constructor(
    private readonly usersService: UsersService,
    private readonly itemsService: ItemsService,
    private readonly listsService: ListsService,
  ) {}

  @Query(() => [User], {
    name: 'users',
    description: 'Get all users'
  })
  async findAll(
    @Args() validRoles: ValidRolesArgs,
    @CurrentUser([ ValidRoles.admin ]) currentUser: User,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<User[]> {
    return await this.usersService.findAll(
      validRoles.roles,
      paginationArgs,
      searchArgs
    );
  }

  @Query(() => User, { name: 'user' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser([ ValidRoles.admin ]) currentUser: User
  ): Promise<User> {
    return await this.usersService.findOneById(id);
  }

  @Mutation(() => User, {
    name: 'updateUser',
    description: 'Update an existing user'
  })
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser([ ValidRoles.admin ]) user: User
  ): Promise<User> {
    return await this.usersService.update(
      updateUserInput.id,
      updateUserInput,
      user
    );
  }

  @Mutation(() => User, { name: 'blockUser' })
  async blockUser (
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser([ ValidRoles.admin ]) user: User
  ): Promise<User> {
    return await this.usersService.block(id, user);
  }

  //* Items Resolvers

  @ResolveField(() => Int, {
    name: 'itemsCount',
    description: 'Get all items from authenticated user'
  })
  async itemCount(
    @CurrentUser([ ValidRoles.admin ]) adminUser: User,
    @Parent() user: User
  ): Promise<number> {
    return await this.itemsService.itemsCountByUser(user.id);
  }

  @ResolveField(() => [Item], {
    name: 'items',
    description: 'Get items paginated and filtered by authenticated user'
  })
  async getItemsByUser(
    @CurrentUser([ ValidRoles.admin ]) adminUser: User,
    @Parent() user: User,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<Item[]> {
    return await this.itemsService.findAll(user.id, paginationArgs, searchArgs);
  }

  //* Lists Resolvers

  @ResolveField(() => Int, {
    name: 'listsCount',
    description: 'Get all lists from authenticated user'
  })
  async listCount(
    @CurrentUser([ ValidRoles.admin ]) adminUser: User,
    @Parent() user: User
  ): Promise<number> {
    return await this.listsService.listsCountByUser(user.id);
  }

  @ResolveField(() => [Item], {
    name: 'lists',
    description: 'Get lists paginated and filtered by authenticated user'
  })
  async getListsByUser(
    @CurrentUser([ ValidRoles.admin ]) adminUser: User,
    @Parent() user: User,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<Item[]> {
    return await this.listsService.findAll(user.id, paginationArgs, searchArgs);
  }

}

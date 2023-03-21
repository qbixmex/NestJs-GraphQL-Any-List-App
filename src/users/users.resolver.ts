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
import { PaginationArgs, SearchArgs } from '../common/dto';

@Resolver(() => User)
@UseGuards( JwtAuthGuard )
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly itemsService: ItemsService
  ) {}

  @Query(() => [User], {
    name: 'users',
    description: 'Get all users'
  })
  async findAll(
    @Args() validRoles: ValidRolesArgs,
    @CurrentUser([ ValidRoles.admin ]) currentUser: User
  ): Promise<User[]> {
    return await this.usersService.findAll(validRoles.roles);
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

}

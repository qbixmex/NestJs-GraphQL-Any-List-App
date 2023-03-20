import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { ValidRolesArgs } from './dto';
import { JwtAuthGuard } from '../auth/guards';
import { User } from './entities';
import { CurrentUser } from '../auth/decorators';
import { ValidRoles } from '../auth/enums';

@Resolver(() => User)
@UseGuards( JwtAuthGuard )
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], {
    name: 'users',
    description: 'Get all users'
  })
  async findAll(
    @Args() validRoles: ValidRolesArgs,
    @CurrentUser([ ValidRoles.admin ]) currentUser: User
  ): Promise<User[]> {
    console.log({ currentUser });

    return await this.usersService.findAll(validRoles.roles);
  }

  @Query(() => User, { name: 'user' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser([ ValidRoles.admin ]) currentUser: User
  ): Promise<User> {
    return await this.usersService.findOneById(id);
  }

  @Mutation(() => User, { name: 'blockUser' })
  async blockUser (
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser([ ValidRoles.admin ]) user: User
  ): Promise<User> {
    return await this.usersService.block(id, user);
  }
}

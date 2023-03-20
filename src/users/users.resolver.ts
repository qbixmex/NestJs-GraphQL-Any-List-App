import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities';
import { CreateUserInput, UpdateUserInput, ValidRolesArgs } from './dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], {
    name: 'users',
    description: 'Get all users'
  })
  async findAll(
    @Args() validRoles: ValidRolesArgs
  ): Promise<User[]> {
    return await this.usersService.findAll(validRoles.roles);
  }

  @Query(() => User, { name: 'user' })
  async findOne(
    @Args('id', { type: () => ID }) id: string
  ): Promise<User> {
    throw new Error('findOne not implemented yet!');
  }

  @Mutation(() => User)
  async blockUser (
    @Args('id', { type: () => ID }) id: string
  ): Promise<User> {
    return await this.usersService.block(id);
  }
}

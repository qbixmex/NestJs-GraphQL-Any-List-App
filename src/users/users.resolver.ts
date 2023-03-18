import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities';
import { CreateUserInput, UpdateUserInput } from './dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], {
    name: 'users',
    description: 'Get all users'
  })
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOne(
    @Args('id', { type: () => ID }) id: string
  ): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  async blockUser (
    @Args('id', { type: () => ID }) id: string
  ): Promise<User> {
    return await this.usersService.block(id);
  }
}

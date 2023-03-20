import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

import { AuthResponse, SignUpInput, LoginInput } from './dto';
import { JwtAuthGuard } from './guards';
import { CurrentUser } from './decorators';
import { User } from '../users/entities';
import { ValidRoles } from './enums';

@Resolver(() => AuthResolver)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Mutation(() => AuthResponse, {
    name: 'signUp',
    description: 'Create a new user and session'
  })
  async signUp(
    @Args('signUpInput') signUpInput: SignUpInput
  ): Promise<AuthResponse> {
    return await this.authService.signUp(signUpInput);
  }

  @Mutation(() => AuthResponse, {
    name: 'login',
    description: 'Check user credentials and generate authentication token'
  })
  async login(
    @Args('loginInput') loginInput: LoginInput
  ): Promise<AuthResponse> {
    return await this.authService.login(loginInput);
  }

  @Query(() => AuthResponse, {
    name: 'revalidate',
    description: 'Check user token if still valid'
  })
  @UseGuards( JwtAuthGuard )
  revalidateToken(
    //? Adding a role
    //? @CurrentUser([ ValidRoles.admin, ValidRoles.superUser ]) user: User
    @CurrentUser() user: User
  ): AuthResponse {
    return this.authService.revalidate(user);
  }

}

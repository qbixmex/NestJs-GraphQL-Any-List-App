import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

import { AuthResponse, SignUpInput } from './dto';

@Resolver()
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

  @Mutation(() => String, {
    name: 'login',
    description: 'Check user credentials and generate authentication token'
  })
  async login(): Promise<any> {
    return this.authService.login();
  }

  @Query(() => String, {
    name: 'revalidate',
    description: 'Check user token if still valid'
  })
  async revalidateToken(): Promise<any> {
    return this.authService.revalidate();
  }
}

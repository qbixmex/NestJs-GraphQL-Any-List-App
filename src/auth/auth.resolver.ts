import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Mutation(() => String, {
    name: 'signUp',
    description: 'Create a new user and session'
  })
  async signUp(): Promise<any> {
    return await this.authService.signUp();
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

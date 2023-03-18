import { Injectable } from '@nestjs/common';

import { AuthResponse, SignUpInput } from './dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
  ){}

  async signUp(signUpInput: SignUpInput): Promise<AuthResponse> {

    const user = await this.usersService.create(signUpInput);

    const token = 'ABC123TOKEN';

    return { token, user };

  }

  async login(): Promise<any> {
    throw new Error('login method not implemented!');
  }

  async revalidate(): Promise<any> {
    throw new Error('revalidate method not implemented!');
  }

}

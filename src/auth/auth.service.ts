import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AuthResponse, SignUpInput, LoginInput } from './dto';
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

  async login(loginInput: LoginInput): Promise<AuthResponse> {

    const {  email, password } = loginInput;
    
    const user = await this.usersService.findOneByEmail(email);

    if ( !bcrypt.compareSync(password, user.password) ) {
      throw new BadRequestException('Email or Password does not match!');
    }

    // TODO
    const token = 'ABC123TOKEN';

    return { token, user };
  }

  async revalidate(): Promise<any> {
    throw new Error('revalidate method not implemented!');
  }

}

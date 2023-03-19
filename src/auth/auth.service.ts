import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthResponse, SignUpInput, LoginInput } from './dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ){}

  /**
   * Generate Json Web Token string
   * @param userId User Identifier
   * @returns New generated token 
   */
  private getJwtToken(userId: string): string {
    return this.jwtService.sign({ id: userId });
  }

  async signUp(signUpInput: SignUpInput): Promise<AuthResponse> {

    const user = await this.usersService.create(signUpInput);

    const token = this.getJwtToken(user.id);

    return { token, user };

  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {

    const {  email, password } = loginInput;
    
    const user = await this.usersService.findOneByEmail(email);

    if ( !bcrypt.compareSync(password, user.password) ) {
      throw new BadRequestException('Email or Password does not match!');
    }

    const token = this.getJwtToken(user.id);

    return { token, user };
  }

  async revalidate(): Promise<any> {
    throw new Error('revalidate method not implemented!');
  }

}

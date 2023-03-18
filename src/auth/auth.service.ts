import { Injectable } from '@nestjs/common';

import { AuthResponse, SignUpInput } from './dto';
import { User } from 'src/users/entities';

@Injectable()
export class AuthService {

  // TODO: constructor(){}

  async signUp(signUpInput: SignUpInput): Promise<AuthResponse> {
    console.log({signUpInput});
    return {
      token: 'jfysdifuyahsdfbnasdfaiuygt',
      user: {
        id: '163c10fb-22d0-4953-958f-3effc7eef18b',
        fullName: 'John Doe',
        email: 'john-doe@some-domain.com',
        password: 'secret-123',
        roles: ['admin'],
        isActive: true,
      },
    };
  }

  async login(): Promise<any> {
    throw new Error('login method not implemented!');
  }

  async revalidate(): Promise<any> {
    throw new Error('revalidate method not implemented!');
  }

}

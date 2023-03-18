import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

  async signUp(): Promise<any> {
    throw new Error('SignUp method not implemented!');
  }

  async login(): Promise<any> {
    throw new Error('login method not implemented!');
  }

  async revalidate(): Promise<any> {
    throw new Error('revalidate method not implemented!');
  }

}

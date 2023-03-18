import { Injectable } from '@nestjs/common';
import { User } from './entities';
import { CreateUserInput, UpdateUserInput } from './dto';

@Injectable()
export class UsersService {
  async findAll(): Promise<User[]> {
    return [];
  }

  async findOne(id: string): Promise<User> {
    throw new Error(`findOne method not implemented`);
  }

  async block(id: string): Promise<User> {
    throw new Error(`block method not implemented`);
  }
}

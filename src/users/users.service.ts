import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities';
import { SignUpInput } from '../auth/dto';
import { CreateUserInput, UpdateUserInput } from './dto';

@Injectable()
export class UsersService {

  private logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ){}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    throw new Error(`findOne method not implemented`);
  }

  async create(signUpInput: SignUpInput): Promise<User> {
    try {
      const newUser = this.usersRepository.create(signUpInput);
      return await this.usersRepository.save(newUser);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async block(id: string): Promise<User> {
    throw new Error(`block method not implemented`);
  }

  private handleDBErrors( error: any ): never {
    this.logger.error(error);

    if (error.code === '23505') {
      throw new BadRequestException( error.detail.replace('Key ', '') );
    }

    throw new InternalServerErrorException('Please check log errors');
  }

}

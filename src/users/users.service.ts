import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities';
import { ValidRoles } from '../auth/enums';
import { SignUpInput } from '../auth/dto';
// import { CreateUserInput, UpdateUserInput } from './dto';


@Injectable()
export class UsersService {

  private logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ){}

  async findAll( roles: ValidRoles[] ): Promise<User[]> {
    if ( roles.length === 0 ) return this.usersRepository.find();

    //? if we have roles, example: ["admin", "superUser"]
    return await this.usersRepository
      .createQueryBuilder()
      .andWhere('ARRAY[roles] && ARRAY[:...roles]')
      .setParameter('roles', roles)
      .getMany();
  }

  async findOneById(id: string): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(`User with id: [${id}] not found!`);
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail({ email });
    } catch (error) {
      throw new NotFoundException(`<${email}> not found!`);
    }
  }

  async create(signUpInput: SignUpInput): Promise<User> {
    try {
      const newUser = this.usersRepository.create({
        ...signUpInput,
        password: bcrypt.hashSync(signUpInput.password, 10),
      });
      return await this.usersRepository.save(newUser);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async block(id: string): Promise<User> {
    throw new Error(`block method not implemented`);
  }

  private handleDBErrors( error: any ): never {
    
    if (error.code === '23505') {
      throw new BadRequestException( error.detail.replace('Key ', '') );
    }

    this.logger.error(error);

    throw new InternalServerErrorException('Please check log errors');

  }

}

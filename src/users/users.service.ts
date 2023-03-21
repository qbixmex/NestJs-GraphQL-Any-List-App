import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities';
import { ValidRoles } from '../auth/enums';
import { SignUpInput } from '../auth/dto';
import { UpdateUserInput } from './dto';
import { PaginationArgs, SearchArgs } from '../common/dto';

@Injectable()
export class UsersService {

  private logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ){}

  async findAll(
    roles: ValidRoles[],
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs,
  ): Promise<User[]> {

    const { limit, offset } = paginationArgs;
    const { search } = searchArgs;

    if ( roles.length === 0 && !limit && !offset && !search ) {
      return this.usersRepository.find();
    }

    const queryBuilder = await this.usersRepository.createQueryBuilder()
      .take(limit)
      .skip(offset)
      .andWhere('ARRAY[roles] && ARRAY[:...roles]')
      .setParameter('roles', roles);

    if (search) {
      queryBuilder.andWhere(
        'LOWER("fullName") like :fullName',        
        { fullName: `%${ search.toLowerCase() }%` }
      );
    }

    return queryBuilder.getMany();

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

  async update(
    id: string,
    updateUserInput: UpdateUserInput,
    updateBy: User
  ): Promise<User> {
    try {
      const user = await this.usersRepository.preload({
        ...updateUserInput,
        id
      });

      //* Add who is updating
      user.lastUpdateBy = updateBy;

      //* Remove Password
      delete user.password;

      return await this.usersRepository.save(user);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async block(id: string, adminUser: User): Promise<User> {

    const userToBlock = await this.findOneById(id);

    //* Block User
    userToBlock.isActive = false;
    userToBlock.lastUpdateBy = adminUser;

    return await this.usersRepository.save(userToBlock);

  }

  private handleDBErrors( error: any ): never {
    
    if (error.code === '23505') {
      throw new BadRequestException( error.detail.replace('Key ', '') );
    }

    if (error.code === 'error-001') {
      throw new BadRequestException( error.detail );
    }

    this.logger.error(error);

    throw new InternalServerErrorException('Please check log errors');

  }

}

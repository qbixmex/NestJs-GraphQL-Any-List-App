import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Item } from '../items/entities';
import { User } from '../users/entities';

@Injectable()
export class SeedService {

  private isProd: boolean;

  constructor(

    private readonly configService: ConfigService,

    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

  ) {
    this.isProd = this.configService.get('STATE') == 'prod';
  }

  async executeSeed(): Promise<boolean> {

    //* Validation
    if ( this.isProd ) {
      throw new UnauthorizedException('We cannot run SEED on Production!');
    }

    // Clear Database
    await this.deleteDatabase();

    // TODO: Create Users
    // TODO: Create Items

    return true;
  }

  async deleteDatabase(): Promise<void> {
    //* Delete Items
    await this.itemsRepository.createQueryBuilder()
      .delete()
      .where({})
      .execute();

    // Delete Users
    await this.usersRepository.createQueryBuilder()
      .delete()
      .where({})
      .execute();
  }

}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../users/entities';
import { List } from './entities';

import { CreateListInput, UpdateListInput } from './dto';
import { PaginationArgs, SearchArgs } from '../common/dto';

@Injectable()
export class ListsService {

  constructor(
    @InjectRepository(List)
    private readonly listsRepository: Repository<List>
  ) {}

  async findAll(
    userId: string,
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs,
  ): Promise<List[]> {

    const { limit, offset } = paginationArgs;
    const { search } = searchArgs;

    const queryBuilder = this.listsRepository.createQueryBuilder()
      .take(limit)
      .skip(offset)
      .where(`"userId" = :userId`, { userId });

    if (search) {
      queryBuilder.andWhere(
        'LOWER(name) like :name',
        { name: `%${ search.toLowerCase() }%` }
      );
    }

    return queryBuilder.getMany();

  }

  async findOne(listId: string, userId: string): Promise<List> {
    const list = await this.listsRepository.findOneBy({
      id: listId,
      user: {
        id: userId,
      }
    });
    if (!list) {
      throw new NotFoundException(`List with id: [${listId}] not found!`);
    }
    return list;
  }

  async create(
    createListInput: CreateListInput,
    user: User
  ): Promise<List> {
    const newList = this.listsRepository.create({ ...createListInput, user });
    return await this.listsRepository.save(newList);
  }

  async update(
    updateListInput: UpdateListInput,
    userId: string,
  ): Promise<List> {

    const { id } = updateListInput;
    await this.findOne(id, userId);

    const list = await this.listsRepository.preload(updateListInput);

    if (!list) {
      throw new NotFoundException(`List with id: (${id}) not found!`);
    }

    return this.listsRepository.save(list);
  }

  async remove(id: string, userId: string): Promise<List> {
    // TODO: soft delete, reference integrity
    const list = await this.findOne(id, userId);
    await this.listsRepository.remove(list);
    return { ...list, id };
  }

  async listsCountByUser( userId: string ): Promise<number> {
    return await this.listsRepository.count({
      where: {
        user: { id: userId }
      }
    });
  }
}

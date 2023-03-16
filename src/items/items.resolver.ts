import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { Item } from './entities/item.entity';
import { CreateItemInput } from './dto';
import { ItemsService } from './items.service';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Query(() => [Item], {
    name: 'getItems',
    description: 'Get all items'
  })
  async findAll(): Promise<Item[]> {
    return await this.itemsService.findAll();
  }

  @Query(() => Item, {
    name: 'getItem',
    description: 'Get a single item with given id'
  })
  async findOne(
    @Args('id', { type: () => String }) id: string
  ): Promise<Item> {
    return await this.itemsService.findOne(id);
  }

  @Mutation(() => Item, {
    name: 'createItem',
    description: 'Create a new item'
  })
  async createItem(
    @Args('createItemInput') createItemInput: CreateItemInput
  ): Promise<Item> {
    return await this.itemsService.create(createItemInput);
  }

  // @Mutation(() => Item, {
  //   name: 'updateItem',
  //   description: 'Update item from given id'
  // })
  // async updateItem(
  //   @Args('updateItemInput') updateItemInput: UpdateItemInput
  // ): Promise<Item> {
  //   return await this.itemsService.update(updateItemInput.id, updateItemInput);
  // }

  // @Mutation(() => Item)
  // async removeItem(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
  //   return await this.itemsService.remove(id);
  // }
}

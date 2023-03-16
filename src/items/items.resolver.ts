import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { Item } from './entities/item.entity';
import { CreateItemInput } from './dto';
import { ItemsService } from './items.service';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Query(() => [Item], { name: 'items' })
  async findAll(): Promise<Item[]> {
    return await this.itemsService.findAll();
  }

  @Query(() => Item, { name: 'item' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.itemsService.findOne(id);
  }

  @Mutation(() => Item, {
    name: 'createItem',
    description: 'Create a new item'
  })
  async createItem(
    @Args('createItemInput') createItemInput: CreateItemInput
  ): Promise<Item> {
    return this.itemsService.create(createItemInput);
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

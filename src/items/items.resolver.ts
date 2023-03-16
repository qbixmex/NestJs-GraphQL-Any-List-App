import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { Item } from './entities/item.entity';
import { CreateItemInput, UpdateItemInput } from './dto';
import { ItemsService } from './items.service';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Query(() => [Item], { name: 'items' })
  findAll(): Item[] {
    return this.itemsService.findAll();
  }

  // @Query(() => Item, { name: 'item' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.itemsService.findOne(id);
  // }

  // @Mutation(() => Item, {
  //   name: 'createItem',
  //   description: 'Create a new item'
  // })
  // createItem(
  //   @Args('createItemInput') createItemInput: CreateItemInput
  // ): Item {
  //   return this.itemsService.create(createItemInput);
  // }

  // @Mutation(() => Item, {
  //   name: 'updateItem',
  //   description: 'Update item from given id'
  // })
  // updateItem(
  //   @Args('updateItemInput') updateItemInput: UpdateItemInput
  // ): Item {
  //   return this.itemsService.update(updateItemInput.id, updateItemInput);
  // }

  // @Mutation(() => Item)
  // removeItem(@Args('id', { type: () => Int }) id: number) {
  //   return this.itemsService.remove(id);
  // }
}

import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { List } from '../../lists/entities';
import { Item } from '../../items/entities';

@Entity({ name: 'listItems' })
@Unique('listItem-item', [ 'list', 'item' ])
@ObjectType()
class ListItem {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'numeric' })
  @Field(() => Number)
  quantity: number;

  @Column({ type: 'boolean' })
  @Field(() => Boolean)
  completed: boolean;

  //* Relationships

  @ManyToOne(
    () => List,
    (list) => list.listItem,
    { lazy: true }
  )
  @Field(() => List)
  list: List;

  @ManyToOne(
    () => Item,
    (item) => item.listItem,
    { lazy: true }
  )
  @Field(() => Item)
  item: Item;

}

export default ListItem;

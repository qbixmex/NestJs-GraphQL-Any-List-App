import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// import { List } from '../../lists/entities';
// import { Item } from '../../items/entities';

@Entity({ name: 'listItems' })
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

  // TODO
  // list: List;

  // TODO
  // item: Item;

}

export default ListItem;

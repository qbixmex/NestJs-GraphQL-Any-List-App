import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../../users/entities';
import { ListItem } from '../../list-item/entities';

@Entity({ name: 'lists' })
@ObjectType()
class List {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToOne(
    () => User,
    (user) => user.lists,
    { nullable: false, lazy: true }
  )
  @Index('userId-list')
  @Field(() => User)
  user: User;

  @OneToMany(
    () => ListItem,
    (listItem) => listItem.list,
    { lazy: true }
  )
  // @Field(() => [ListItem])
  listItem: ListItem[];
}

export default List;

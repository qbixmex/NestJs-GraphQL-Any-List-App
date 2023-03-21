import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities';

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
}

export default List;

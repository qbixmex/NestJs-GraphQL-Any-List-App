import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities';

@Entity({ name: 'items' })
@ObjectType()
class Item {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  quantityUnits?: string;

  // Todo: stores

  //* User Relationship
  @ManyToOne(
    () => User,
    (user) => user.items,
    {
      nullable: false,
      lazy: true,
    }
  )
  @Index('userId')
  @Field(() => User)
  user: User;
}

export default Item;

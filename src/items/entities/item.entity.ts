import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'items' })
@ObjectType()
class Item {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => Float)
  quantity: number;

  @Column()
  @Field(() => String)
  quantityUnits: string;

  // stores
  // user
}

export { Item };

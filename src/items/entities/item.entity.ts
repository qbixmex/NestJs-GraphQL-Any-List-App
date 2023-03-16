import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
class Item {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

export { Item };

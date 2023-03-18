import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
class User {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

export default User;

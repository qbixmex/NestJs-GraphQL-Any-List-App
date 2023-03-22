import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
class CreateListItemInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

export default CreateListItemInput;

import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
class CreateUserInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

export default CreateUserInput;

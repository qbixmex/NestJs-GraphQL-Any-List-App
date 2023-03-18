import { CreateUserInput } from '.';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int)
  id: number;
}

export default UpdateUserInput;

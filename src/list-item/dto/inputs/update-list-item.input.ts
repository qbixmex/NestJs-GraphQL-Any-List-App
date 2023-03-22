import { CreateListItemInput } from '.';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
class UpdateListItemInput extends PartialType(CreateListItemInput) {
  @Field(() => Int)
  id: number;
}

export default UpdateListItemInput;

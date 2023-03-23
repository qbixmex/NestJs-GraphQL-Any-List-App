import { CreateListItemInput } from '.';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
class UpdateListItemInput extends PartialType(CreateListItemInput) {

  @Field(() => ID)
  @IsUUID()
  id: string;

}

export default UpdateListItemInput;

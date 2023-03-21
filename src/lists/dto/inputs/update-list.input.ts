import { CreateListInput } from '.';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
class UpdateListInput extends PartialType(CreateListInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export default UpdateListInput;

import { CreateListInput } from '.';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID, IsString } from 'class-validator';

@InputType()
class UpdateListInput extends PartialType(CreateListInput) {

  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;

}

export default UpdateListInput;

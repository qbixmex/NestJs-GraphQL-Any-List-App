import { CreateItemInput } from '.';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsNotEmpty,IsUUID } from 'class-validator';

@InputType()
class UpdateItemInput extends PartialType(CreateItemInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export default UpdateItemInput;

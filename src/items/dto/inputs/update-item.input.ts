import { CreateItemInput } from '..';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNumber, Min } from 'class-validator';

@InputType()
class UpdateItemInput extends PartialType(CreateItemInput) {
  @Field(() => Int)
  @IsNumber()
  @Min(0)
  id: number;
}

export default UpdateItemInput;

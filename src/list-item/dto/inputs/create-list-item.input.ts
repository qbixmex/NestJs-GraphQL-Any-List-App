import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNumber, Min, IsBoolean, IsOptional, IsUUID } from 'class-validator';

@InputType()
class CreateListItemInput {

  @Field(() => Number, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Min(0)
  quantity: number = 0;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  completed: boolean = false;

  @Field(() => ID)
  @IsUUID()
  listId: string;

  @Field(() => ID)
  @IsUUID()
  itemId: string;

}

export default CreateListItemInput;

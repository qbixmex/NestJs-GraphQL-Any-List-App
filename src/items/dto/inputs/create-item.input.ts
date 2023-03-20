import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
class CreateItemInput {

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  quantityUnits?: string;

}

export default CreateItemInput;

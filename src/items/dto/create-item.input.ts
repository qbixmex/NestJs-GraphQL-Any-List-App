import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, Min } from 'class-validator';

@InputType()
class CreateItemInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  @IsNumber()
  @Min(0)
  exampleField: number;
}

export default CreateItemInput;

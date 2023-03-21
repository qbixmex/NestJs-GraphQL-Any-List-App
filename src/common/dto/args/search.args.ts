import { ArgsType, Field } from "@nestjs/graphql";
import { IsOptional, IsString, MinLength } from 'class-validator';

@ArgsType()
class SearchArgs {

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(3)
  search?: string;

}

export default SearchArgs;
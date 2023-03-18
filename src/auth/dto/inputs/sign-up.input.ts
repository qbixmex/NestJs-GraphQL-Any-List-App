import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
class SignUpInput {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  fullName: string;

  @Field(() => String)
  @MinLength(8)
  password: string;
}

export default SignUpInput;
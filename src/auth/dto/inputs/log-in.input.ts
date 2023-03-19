import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MinLength, IsNotEmpty } from 'class-validator';

@InputType()
class LoginInput {

  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(8)
  password: string;

}

export default LoginInput;
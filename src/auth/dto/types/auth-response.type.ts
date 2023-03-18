import { Field, ObjectType } from "@nestjs/graphql";
import { User } from '../../../users/entities'

@ObjectType()
class AuthResponse {
  @Field(() => String)
  token: string;

  @Field(() => User)
  user: User;
}

export default AuthResponse;

import { ArgsType, Field } from "@nestjs/graphql";
import { IsArray } from "class-validator";
// import { ValidRoles } from "../../../auth/enums";

@ArgsType()
class ValidRolesArgs {

  @Field(() => [String], { nullable: true })
  @IsArray()
  roles: string[] = [];
  // roles: ValidRoles[] = [];

}

export default ValidRolesArgs;

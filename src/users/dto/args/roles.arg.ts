import { ArgsType, Field } from "@nestjs/graphql";
import { IsArray } from "class-validator";
import { ValidRoles } from "../../../auth/enums";

@ArgsType()
class ValidRolesArgs {

  @Field(() => [ValidRoles], { nullable: true })
  @IsArray()
  roles: ValidRoles[] = [];

}

export default ValidRolesArgs;

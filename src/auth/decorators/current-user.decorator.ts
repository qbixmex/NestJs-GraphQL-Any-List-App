import { createParamDecorator, ExecutionContext, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ValidRoles } from '../enums';
import { User } from '../../users/entities';

const CurrentUser = createParamDecorator(

  (roles: ValidRoles[] = [], context: ExecutionContext) => {

    const ctx = GqlExecutionContext.create(context);
    const user: User = ctx.getContext().req.user;

    if (!user) {
      let message: string;
      message += 'No user inside the request - ';
      message += 'make sure to use AuthGuard';
      throw new InternalServerErrorException(message);
    }

    if ( roles.length === 0 ) return user;

    for (const role of user.roles) {
      // TODO: Delete ValidRoles casting
      if ( roles.includes( role as ValidRoles ) ) {
        return user;
      }
    }

    throw new ForbiddenException(
      `User ${ user.fullName } need a valid role: [${ roles.join(', ') }]`
    );

  }

  );

export default CurrentUser;

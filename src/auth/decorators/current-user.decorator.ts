import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

const CurrentUser = createParamDecorator(
  (roles = [], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;

    if (!user) {
      let message: string;
      message += 'No user inside the request - ';
      message += 'make sure to use AuthGuard';
      throw new InternalServerErrorException(message);
    }

    return user;
  }
);

export default CurrentUser;

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    // _ before data to ignore eslint that argument is not use
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);

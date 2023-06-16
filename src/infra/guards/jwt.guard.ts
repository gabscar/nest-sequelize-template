import { IS_PUBLIC_KEY_DECORATOR } from '@domain/constants/decorators.constant';
import { AuthenticationErrors } from '@domain/errors/auth/authError';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY_DECORATOR,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) return true;

    //perguntar ao igor
    const canActivate = super.canActivate(context);

    if (typeof canActivate === 'boolean') return canActivate;

    const canActivatePromise = canActivate as Promise<boolean>;

    return canActivatePromise.catch((_error) => {
      throw AuthenticationErrors.notAllowed();
    });
  }
}

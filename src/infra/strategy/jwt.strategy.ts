import { IJwtAuthPayload } from '@domain/interfaces/auth/auth.interface';
import { UserModel } from '@infra/database/models/user.model';
import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UserModel)
    private databaseService: typeof UserModel,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: IJwtAuthPayload): Promise<IJwtAuthPayload | boolean> {
    const user = await this.databaseService.findOne({
      where: { id: payload.id },
    });

    if (!user.get({ plain: true })) return false;

    return payload;
  }
}

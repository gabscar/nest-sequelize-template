import { IJwtAuthPayload } from '@domain/interfaces/auth/auth.interface';
import { PrismaService } from '@infra/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: IJwtAuthPayload): Promise<IJwtAuthPayload | boolean> {
    const user = await this.prisma.user.findFirst({
      where: { id: payload.id },
    });

    if (!user) return false;

    return payload;
  }
}

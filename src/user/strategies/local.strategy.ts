// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import 'dotenv/config';
import { Request } from 'express';
import { JwtDto } from '../dto/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          if (req.headers['token']) {
            return req.headers['token'];
          }
          return null;
        },
      ]),
      secretOrKey: process.env.JWT,
    });
  }

  async validate(payload: JwtDto) {
    return { id: payload.id, name: payload.name };
  }
}

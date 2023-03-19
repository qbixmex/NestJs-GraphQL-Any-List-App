import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../../users/entities';
import { JwtPayload } from '../interfaces';
import { AuthService } from '../auth.service';

@Injectable()
class JwtStrategy extends PassportStrategy( Strategy ) {

  constructor(
    private readonly authService: AuthService,
    configService: ConfigService
  ){
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {

    const { id } = payload;

    const user = await this.authService.validateUser(id);

    return user;

  }

}

export default JwtStrategy;
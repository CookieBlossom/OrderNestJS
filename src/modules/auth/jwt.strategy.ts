import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';
import { UsersService } from 'src/modules/users/users.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET!
      // esto es para decirle con el signo de exclamacion que nunca sera undefined
    });
  }

  validate(payload: JwtPayload) {
    const user = this.usersService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

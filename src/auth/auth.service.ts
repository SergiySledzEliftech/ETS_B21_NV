import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
interface IFilteredUser {
  readonly _id: string;
  readonly nickname: string;
  readonly email: string;
  readonly avatar: string;
  readonly dollarBalance: number;
  readonly lastBonusTime: number;
}
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<IFilteredUser> {
    const user = await this.usersService.getOneByEmail(email);

    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);

      if (isMatch) {
        return {
          _id: user._id.toString(),
          nickname: user.nickname,
          email: user.email,
          avatar: user.avatar,
          dollarBalance: user.dollarBalance,
          lastBonusTime: user.lastBonusTime,
        };
      }

      return null;
    }

    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.nickname,
      email: user.email,
      sub: user._id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

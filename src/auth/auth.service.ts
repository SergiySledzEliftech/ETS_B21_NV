import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.getOneByEmail(email);
        if (user) {
            // const hash = await bcrypt.hash(pass, +process.env.SALT);
            const isMatch = await bcrypt.compare(pass, user.password);

            if (isMatch) {
                const { password, ...result } = user;
                return result;
            }
            throw new HttpException('Password is incorrect', HttpStatus.UNAUTHORIZED);
        } else {
            throw new HttpException('Email is incorrect', HttpStatus.UNAUTHORIZED);
        }
    }

    async login(user: any) {
        const payload = { username: user.nickname, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}

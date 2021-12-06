import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.quard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) { }

  // @UseGuards(LocalAuthGuard)
  // @Post('users/login')
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }

  @UseGuards(JwtAuthGuard)
  @Get('users/profile')
  getProfile(@Request() req) {
    // const [bearer, token] = req.headers.authorization.split(' ')
    // console.log(bearer, token);
    // console.log(req.user);
    
    // User is existed
    return req.user;
  }
}

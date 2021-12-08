import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.quard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) { }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('bearerAuth')
  @Get('users/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

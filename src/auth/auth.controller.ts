import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.quard';
import { ApiSecurity } from '@nestjs/swagger';

@Controller('auth')
export class Auth {
  jwtService: any;
  constructor(private authService: AuthService) {}

  
  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() userDto: CreateUserDto): Promise<any> {
    return await this.authService.registerUser(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('bearerAuth')
  @Get('logout')
  @HttpCode(HttpStatus.GONE)
  async logout(@Request() { user }): Promise<any> {
    return await this.authService.logout(user.id);
  }
}

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
  UseGuards
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.quard';

@Controller('auth')
export class Auth {
  jwtService: any;
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() userDto: CreateUserDto): Promise<any> {
    return await this.authService.registerUser(userDto);

  }
    
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  // @HttpCode(HttpStatus.CREATED)
  async logout(@Request() { user }): Promise<any> {
    
    // return await this.authService.logout(user.id);
  }
}


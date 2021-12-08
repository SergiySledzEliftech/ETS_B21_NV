import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserBalanceDto } from './dto/update-user-balance.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiSecurity('bearerAuth')
  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('bearerAuth')
  @Get('/getOne')
  getOne(@Request() { user }): Promise<User> {
    return user;
  }
  
  // @UseGuards(JwtAuthGuard)
  @ApiSecurity('bearerAuth')
  @Get('/balance/:id')
  getBalance(@Param('id') id: string): Promise<number> {
    return this.usersService.getBalance(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('bearerAuth')
  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() userDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser({ id, userDto });
  }

  // @UseGuards(JwtAuthGuard)
  @ApiSecurity('bearerAuth')
  @Put('balance/:id')
  updateBalance(
    @Param('id') id: string,
    @Body() userBalanceDto: UpdateUserBalanceDto,
  ): Promise<User> {
    return this.usersService.updateBalance({ id, userBalanceDto });
  }
}

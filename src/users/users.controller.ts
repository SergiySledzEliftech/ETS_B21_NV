import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  Post,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserBalanceDto } from './dto/update-user-balance.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

interface IFilteredUser {
  readonly nickname: string;
  readonly email: string;
  readonly avatar: string;
  readonly dollarBalance: number;
  readonly lastBonusTime: number;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getOne')
  getOne(@Request() { user }): Promise<User> {
    return user;
  }
  
  @Get('/balance/:id')
  getBalance(@Param('id') id: string): Promise<number> {
    return this.usersService.getBalance(id);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() userDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser({ id, userDto });
  }

  @Put('balance/:id')
  updateBalance(
    @Param('id') id: string,
    @Body() userBalanceDto: UpdateUserBalanceDto,
  ): Promise<User> {
    return this.usersService.updateBalance({ id, userBalanceDto });
  }
}

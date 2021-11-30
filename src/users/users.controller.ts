import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserBalanceDto } from './dto/update-user-balance.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
// import { JwtService } from '@nestjs/jwt';

interface IFilteredUser {
  readonly nickname: string;
  readonly email: string;
  readonly avatar: string;
  readonly dollarBalance: number;
  readonly lastBonusTime: number;
}

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    // private readonly jwtService: JwtService,
  ) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<User> {
    return this.usersService.getOne(id);
  }

  @Get('get/:email')
  getOneByEmail(@Param('email') email: string): Promise<User> {
    return this.usersService.getOneByEmail(email);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() userDto: CreateUserDto): Promise<any> {
    const newUser = await this.usersService.registrateUser(userDto);

    return {
      // access_token: this.jwtService.sign({
      //   username: newUser.nickname,
      //   email: newUser.email,
      //   sub: newUser._id,
      // }),
      nickname: newUser.nickname,
      email: newUser.email,
      avatar: newUser.avatar,
      dollarBalance: newUser.dollarBalance,
      lastBonusTime: newUser.lastBonusTime,
    };
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() userDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser({ id, userDto });
  }

  @Patch('balance/:id')
  updateBalance(
    @Param('id') id: string,
    @Body() userBalanceDto: UpdateUserBalanceDto,
  ): Promise<User> {
    return this.usersService.updateBalance({ id, userBalanceDto });
  }
}

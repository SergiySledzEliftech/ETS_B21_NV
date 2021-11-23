import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserBalanceDto } from './dto/update-user-balance.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<User> {
    const result = await this.usersService.getOne(id);
    console.log(result);

    return result;
  }

  @Get('/balance/:id')
  getBalance(@Param('id') id: string): Promise<number> {
    return this.usersService.getBalance(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() userDto: CreateUserDto): Promise<User> {
    return this.usersService.creatUser(userDto);
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

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { HttpCode } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getOne(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  // example register
  async creatUser(userDto: CreateUserDto): Promise<any> {
    const saltRounds = 10;
    const password = userDto.password;
    const hash = await bcrypt.hash(password, saltRounds);

    const newUser = new this.userModel(userDto);
    newUser.password = hash;
    newUser.lastBonusTime = Date.now();
    return newUser.save();
  }

  async updateUser({ id, userDto }): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, userDto, { new: true });
  }

  async updateBalance({ id, userBalanceDto }): Promise<User> {
    const { dollarBalance } = await this.userModel.findById(id);
    const newBalance = dollarBalance + userBalanceDto.dollarBalance;

    if (newBalance < 0) {
      throw new BadRequestException(
        'there are not enough funds on your balance',
      );
    }
    userBalanceDto.dollarBalance = newBalance;
    return this.userModel.findByIdAndUpdate(id, userBalanceDto, { new: true });
  }
}

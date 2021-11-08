import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  async creatUser(userDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(userDto);
    return newUser.save();
  }

  async updateUser({ id, userDto }): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, userDto, { new: true });
  }

  async updateBalance({ id, userBalanceDto }): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, userBalanceDto, { new: true });
  }
}

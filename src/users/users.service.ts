import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UseFilters,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAll(): Promise<User[]> {
    const result = await this.userModel.find().exec();
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  async getOne(id: string): Promise<User> {
    const result = await this.userModel.findById(id).select(' -password');
    if (!result) {
      throw new BadRequestException('Bad id');
    }
    return result;
  }

  async getBalance(id: string): Promise<number> {
    const result = await this.userModel.findById(id);
    if (!result) {
      throw new BadRequestException('Bad id');
    }
    return result.dollarBalance;
  }

  async updateUser({ id, userDto }): Promise<User> {
    if (id.length !== 24) {
      throw new BadRequestException('Bad length id');
    }
    const result = await this.userModel.findByIdAndUpdate(id, userDto, {
      new: true,
    });
    if (!result) {
      throw new BadRequestException('Bad id');
    }
    return result;
  }

  async updateBalance({ id, userBalanceDto }): Promise<User> {
    if (id.length !== 24) {
      throw new BadRequestException('Bad length id');
    }
    const result = await this.userModel.findById(id);
    if (!result) {
      throw new BadRequestException('Bad id');
    }
    const { dollarBalance } = result;
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

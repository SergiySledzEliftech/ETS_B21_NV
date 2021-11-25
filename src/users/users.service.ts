import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getOne(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  //auth
  async getOneByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email });
  }


  async registrateUser(userDto: CreateUserDto): Promise<User> {
    const { email } = userDto;
    const checkUser = await this.getOneByEmail(email);

    if (checkUser) {
      throw new HttpException('User with this email adress is already exsists', HttpStatus.FORBIDDEN);
    } else {
      const pass = userDto.password;
      const hash = await bcrypt.hash(pass, +process.env.SALT);
      
      const newUser = new this.userModel(userDto);
      newUser.password = hash;
      newUser.lastBonusTime = Date.now();
      return await newUser.save();
    }
  }

  async updateUser({ id, userDto }): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, userDto, { new: true });
  }

  async updateBalance({ id, userBalanceDto }): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, userBalanceDto, { new: true });
  }
}

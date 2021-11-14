import { Injectable } from '@nestjs/common';
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
    //check user
    const { email } = userDto;
    const checkUser = this.userModel.findOne({ email });
    !!checkUser ? console.log('already exists') : console.log('is new');
    

    const saltOrRounds = 10;
    const password = userDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const newUser = new this.userModel(userDto);
    newUser.password = hash;
    return newUser.save();
  }

  async updateUser({ id, userDto }): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, userDto, { new: true });
  }

  async updateBalance({ id, userBalanceDto }): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, userBalanceDto, { new: true });
  }
}

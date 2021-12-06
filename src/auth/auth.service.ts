import { HttpException, HttpStatus, Injectable, Request } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { IFilteredUser } from 'src/users/interfaces/filteredUser.interface';

@Injectable()
export class AuthService {
  @InjectModel(User.name) private userModel: Model<UserDocument>;
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async getOneByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email });
  }

  async registerUser(userDto: CreateUserDto): Promise<IFilteredUser> {
    const { email, nickname, password } = userDto;

    if (!email || !nickname || !password) {
      throw new HttpException('User data is not valid.', HttpStatus.FORBIDDEN);
    }

    const checkUser = await this.getOneByEmail(email);
    if (checkUser) {
      throw new HttpException(
        'User with this email dares is already exists',
        HttpStatus.FORBIDDEN,
      );
    } else {
      const pass = userDto.password;
      const hash = await bcrypt.hash(pass, +process.env.SALT);
      const newUser = new this.userModel(userDto);

      newUser.password = hash;
      newUser.lastBonusTime = Date.now();
      const saveUser = await newUser.save();

      const { id } = saveUser;
      const payload = { id };
      const access_token = this.jwtService.sign(payload);
      saveUser.access_token = access_token;

      const filtU = await this.userModel.findByIdAndUpdate(id, saveUser, {
        new: true,
      });

      return this.filterUserData(filtU);
    }
  }

  async validateUser(email: string, pass: string): Promise<IFilteredUser> {
    const user = await this.getOneByEmail(email);

    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        return this.filterUserData(user);
      }
      return null;
    }
    return null;
  }

  async login(user: any): Promise<CreateUserDto> {
    const { email } = user;
    const result: CreateUserDto = await this.getOneByEmail(email);

    const { id } = result;
    const payload = { id };
    const access_token = this.jwtService.sign(payload);
    result.access_token = access_token;

    const filteredUser = await this.userModel.findByIdAndUpdate(id, result, {
      new: true,
    });

    return this.filterUserData(filteredUser);
  }

  async logout(id): Promise<any> {
    return this.userModel.findByIdAndUpdate(
      id,
      { access_token: '' },
      { new: true },
    );
  }

  filterUserData(user) {
    return {
      access_token: user.access_token,
      _id: user._id,
      nickname: user.nickname,
      email: user.email,
      avatar: user.avatar,
      dollarBalance: user.dollarBalance,
      lastBonusTime: user.lastBonusTime,
    };
  }
}

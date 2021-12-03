import { HttpException, HttpStatus, Injectable, Request } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
interface IFilteredUser {
  // readonly _id: string;
  readonly nickname: string;
  readonly email: string;
  readonly avatar: string;
  readonly dollarBalance: number;
  readonly lastBonusTime: number;
}
@Injectable()
export class AuthService {
  @InjectModel(User.name) private userModel: Model<UserDocument>
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

// 
// TODO: Update schema.
async getOneByEmail(email: string): Promise<User | undefined> {
  return this.userModel.findOne({ email });
}
// TODO: Update schema.
async registerUser(userDto: CreateUserDto): Promise<User> {
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

    const payload = { email };
    const access_token = this.jwtService.sign(payload)

    newUser.password = hash;
    newUser.lastBonusTime = Date.now();
    newUser.access_token = access_token;

    const result =  await newUser.save();

    result.password = ''
    return result
  
  }
}
// 

  async validateUser(email: string, pass: string): Promise<IFilteredUser> {
    const user = await this.getOneByEmail(email);

    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);

      if (isMatch) {
        return {
          // _id: user._id.toString(),
          nickname: user.nickname,
          email: user.email,
          avatar: user.avatar,
          dollarBalance: user.dollarBalance,
          lastBonusTime: user.lastBonusTime,
        };
      }

      return null;
    }

    return null;
  }

  async login(user: any) {
    console.log(user, 'user');
    const { email } = user
    const payload = {
      email: user.email
    };
    const access_token = this.jwtService.sign(payload)
    const result = await this.getOneByEmail(email)
    result.access_token = access_token

    const updateUser = await this.userModel.findOneAndUpdate({email: result.email}, result, {new: true})
    updateUser.password = ''
    
    return updateUser
}
}

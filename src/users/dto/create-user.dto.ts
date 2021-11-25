export class CreateUserDto {
  readonly nickname: string;
  readonly email: string;
  password: string;
  readonly avatar: string;
  readonly dollarBalance: number;
  readonly lastBonusTime: number;
}

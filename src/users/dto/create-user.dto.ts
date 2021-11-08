export class CreateUserDto {
  readonly nickname: string;
  readonly email: string;
  readonly password: string;
  readonly avatar: string;
  readonly dollarBalance: number;
  readonly lastBonusTime: string;
}

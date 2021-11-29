import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Currency, CurrencyDocument } from './schemas/currency.schema';

import { UserCurrencyDto } from './dto/user-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';

@Injectable()
export class UserCurrenciesService {
  constructor(
    @InjectModel(Currency.name) private currencyModel: Model<CurrencyDocument>
  ) {}

  async getAllCurrenciesByUserId(userId: string): Promise<Currency[]> {
    return this.currencyModel.find({ userId });
  }

  async getAllCurrenciesByName(name: string): Promise<Currency[]> {
    return this.currencyModel.find({ name });
  }

  async getOneCurrency(
    userId: string,
    name: string
  ): Promise<Currency> {
    return this.currencyModel.findOne({ name, userId });
  }

  async createCurrency(currencyDto: UserCurrencyDto): Promise<Currency> {
    const newUserCurrency = new this.currencyModel(currencyDto);
    return newUserCurrency.save();
  }

  async removeCurrency(
    userId: string, 
    name: string
  ): Promise<Currency> {
    return this.currencyModel.findOneAndRemove({ name, userId });
  }

  async updateCurrency(updateDto: UpdateCurrencyDto): Promise<Currency> {
    const { userId, amount, name, updatedAt } = updateDto;
    return this.currencyModel
      .findOneAndUpdate({ userId, name }, { amount, updatedAt });
  }
}

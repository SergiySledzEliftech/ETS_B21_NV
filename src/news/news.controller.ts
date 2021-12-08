import { Controller, Post,Get, Patch,Delete, Body,Param, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { HttpService } from '@nestjs/axios';
import { ApiSecurity } from '@nestjs/swagger';


@Controller('news')
export class NewsController {
	constructor(private readonly newsService: NewsService,
				private httpService: HttpService) {}

	@ApiSecurity('bearerAuth')			
	@Get('')
	async getAllNews(@Query() currency: string) {
		return this.newsService.getNews(currency);
	}

	@ApiSecurity('bearerAuth')
	@Get(':id')
	findONe(@Param('id') id: string) {
		return this.newsService.findOne(id);
	}

	
	
} 
import { HttpService } from '@nestjs/axios';
import {  Injectable } from '@nestjs/common';
import {map, take} from 'rxjs/operators';
import {lastValueFrom} from 'rxjs'


@Injectable()
export class NewsService {

	constructor(private httpService: HttpService) {}

	async getNewsArray(tickers: string[] = ["BTC", "ETH"], itemsLimit: number = 30) {
		
		const newsStream$ = this.httpService.get(`https://cryptonews-api.com/api/v1?tickers=${tickers}&items=${itemsLimit}&token=${process.env.newsApiKey}`)
					.pipe(
					map((response) => response.data),
					map((data) => data['data'])
				)
		
		const news = await lastValueFrom(newsStream$);
		return news
	}

	 addNewsId(news) {
			news = news.map(item => {
						let itemId = item.news_url.split('/')

						if (itemId[itemId.length - 1]) {
							item.id = itemId[itemId.length - 1]
						} else {
							item.id = itemId[itemId.length - 2]
						}
						return item
			})

			return news
	}

	parseDate(news)  {
		return news.map(article => {
			let date = article.date

			// Date parsing
			date = date.split(' ').splice(1,4);
			date[3] = date[3].split(':');
			date[3].pop();
			date[3] = date[3].join(':')
			date.splice(2,1);
			date = date.join(' ')
			article.date = date

			return article	
		})
	}


    likedNews: any = [];

	async getNews (query: any = false) { 
		let news: any = [];
		if(Object.keys(query).length) {
			news = await this.getNewsArray(query.tickers, query.items);
		} else {
			news = await this.getNewsArray();
		}
		
		news = this.addNewsId(news)
		news = this.parseDate(news)
		
		return news
	}

    async findOne (id: string) {
			let news: any = [];
				
			news = await this.getNewsArray()


			let selectedArticle = []; 
			news = this.addNewsId(news)
			news = this.parseDate(news)


			await news.forEach(item => {
				if (item.id == id) {
						selectedArticle.push(item)
				}
			});
			
			return selectedArticle[0]
    }



}


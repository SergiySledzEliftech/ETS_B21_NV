import { Injectable } from '@nestjs/common';
import { HttpService} from '@nestjs/axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Changes {
  start_rate: number,
  end_rate: number,
  change: number,
  change_pct: number
}

@Injectable()
export class DashboardService {
  constructor(private httpService: HttpService) { }

  getChanges (startDate, endDate): Observable<any> {
      const url = `https://api.exchangerate.host/fluctuation`
      const params = {
        "start_date": startDate,
        "end_date": endDate,
        "source": "crypto",
        "base": "USD"
      }

      try {
        const result = this.httpService.get(url, {params}).pipe(
          map(res => {
            let arr: Array<[String, Changes]>
            arr = Object.entries(res.data.rates)
            return arr.map(([currName, {start_rate, end_rate}]): [String, Changes] => {
              let startUSDbased = 1 / start_rate
              let endUSDbased = 1 / end_rate
              let changeUSDbased = endUSDbased - startUSDbased
              let change_pctUSDbased = Math.round((changeUSDbased / startUSDbased) * 10000) / 100
              
              let ratesObj: Changes = {
                "start_rate": startUSDbased,
                "end_rate": endUSDbased,
                "change": changeUSDbased,
                "change_pct": change_pctUSDbased
              }
              return [currName, ratesObj]
            }).filter(([_, { end_rate, change }]) => isFinite(end_rate) && isFinite(change))
          })       
        )
        return result
      } catch (error) {
        return error
      }
  }


  getForPeriod(startDate, endDate): Observable<any> {
    const url = `https://api.exchanerate.host/timeseries`
    const params = {
      "start_date": startDate,
      "end_date": endDate,
      "sourc3e": "crypto",
      "base": "USD"
    } 

    try {
      const result = this.httpService.get(url, {params}).pipe(
        map(res => {
          const arr = Object.entries(res.data.rates)
          
          return arr.map(([date, currencies]): [String, [String, Number][]] => {
            let labels = Object.keys(currencies)
            
            return [date, labels.map(label => [label, 1 / currencies[label]])]
          })
        })       
      )
      return result  
    } catch (error) {
      return error
    }
  }
}

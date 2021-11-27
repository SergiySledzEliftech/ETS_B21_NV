import { Controller, Get, Query } from '@nestjs/common';
import { map } from 'rxjs';

import { DashboardService } from './dashboard.service';

@Controller('/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }

  @Get('/changes')
  async getChanges(@Query('startDate') startDate, @Query('endDate') endDate): Promise<any> {
    const result = await this.dashboardService.getChanges(startDate, endDate)
    result.pipe(map(res => res))
    
    return result
  }

  @Get('/period')
  async getForPeriod(@Query('startDate') startDate, @Query('endDate') endDate): Promise<any> {
    const result = await this.dashboardService.getForPeriod(startDate, endDate)
    result.pipe(map(res => res))
    
    return result
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('overview')
  @ApiOperation({ summary: 'Get org-wide dashboard telemetry overview' })
  @ApiQuery({ name: 'timeframe', required: false, example: '24h' })
  getOverview(@Query('timeframe') timeframe?: string) {
    return this.analyticsService.getOverview(timeframe || '24h');
  }

  @Get('studio')
  @ApiOperation({ summary: 'Get multi-dimensional Analytics Studio matrix and projections' })
  @ApiQuery({ name: 'timeframe', required: false, example: '7d' })
  @ApiQuery({ name: 'metric', required: false, example: 'kwh' })
  getStudio(
    @Query('timeframe') timeframe?: string,
    @Query('metric') metric?: string
  ) {
    return this.analyticsService.getStudio(timeframe || '7d', metric || 'kwh');
  }
}

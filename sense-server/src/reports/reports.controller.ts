import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ReportsService } from './reports.service';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('preview')
  @ApiOperation({ summary: 'Get executive energy compliance report compilation preview' })
  @ApiQuery({ name: 'type', required: false, example: 'MONTHLY_AUDIT' })
  @ApiQuery({ name: 'period', required: false, example: '2026-11' })
  getPreview(
    @Query('type') type?: string,
    @Query('period') period?: string
  ) {
    return this.reportsService.getPreview(type || 'MONTHLY_AUDIT', period || '2026-11');
  }

  @Get('archive')
  @ApiOperation({ summary: 'Get list of historical compiled audit reports' })
  getArchive() {
    return this.reportsService.getArchive();
  }
}

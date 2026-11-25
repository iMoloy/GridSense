import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AlertsService } from './alerts.service';

@ApiTags('alerts')
@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Get('events')
  @ApiOperation({ summary: 'Get active and historical alert events' })
  @ApiQuery({ name: 'status', required: false, example: 'NEW' })
  @ApiQuery({ name: 'severity', required: false, example: 'CRITICAL' })
  findAllEvents(
    @Query('status') status?: string,
    @Query('severity') severity?: string
  ) {
    return this.alertsService.findAllEvents(status, severity);
  }

  @Get('rules')
  @ApiOperation({ summary: 'Get configured threshold and anomaly rules' })
  findAllRules() {
    return this.alertsService.findAllRules();
  }

  @Post('rules')
  @ApiOperation({ summary: 'Create new alert rule' })
  createRule(@Body() body: any) {
    return this.alertsService.createRule(body);
  }
}

import { Controller, Get, Post, Patch, Body, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
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

  @Patch('events/:id/status')
  @ApiOperation({ summary: 'Update alert event status (ACKNOWLEDGE or RESOLVE)' })
  updateEventStatus(
    @Param('id') id: string,
    @Body() body: { status: 'ACKNOWLEDGED' | 'RESOLVED' }
  ) {
    return this.alertsService.updateEventStatus(id, body.status);
  }

  @Get('rules')
  @ApiOperation({ summary: 'Get configured threshold and anomaly rules' })
  findAllRules() {
    return this.alertsService.findAllRules();
  }

  @Post('rules')
  @ApiOperation({ summary: 'Create new alert rule' })
  createRule(@Body() body: Record<string, unknown>) {
    return this.alertsService.createRule(body);
  }
}

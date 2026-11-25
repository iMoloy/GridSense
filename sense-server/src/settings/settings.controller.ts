import { Controller, Get, Patch, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SettingsService } from './settings.service';

@ApiTags('settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @ApiOperation({ summary: 'Get organization configuration, tariff rates, telemetry health, and team' })
  getSettings() {
    return this.settingsService.getSettings();
  }

  @Patch('org')
  @ApiOperation({ summary: 'Update organization profile (name, industry, slug)' })
  updateOrg(@Body() body: { name?: string; industry?: string; slug?: string }) {
    return this.settingsService.updateOrg(body);
  }

  @Patch('tariff')
  @ApiOperation({ summary: 'Update tariff rates and carbon factor' })
  updateTariff(
    @Body()
    body: {
      peakRatePerKwh?: number;
      offPeakRatePerKwh?: number;
      peakHoursStart?: string;
      peakHoursEnd?: string;
      currency?: string;
      carbonFactorKgPerKwh?: number;
    }
  ) {
    return this.settingsService.updateTariff(body);
  }
}

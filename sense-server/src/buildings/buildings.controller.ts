import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BuildingsService } from './buildings.service';

@ApiTags('buildings')
@Controller('buildings')
export class BuildingsController {
  constructor(private readonly buildingsService: BuildingsService) {}

  @Get()
  @ApiOperation({ summary: 'List all facilities and campus buildings' })
  @ApiResponse({ status: 200, description: 'All campus buildings' })
  findAll() {
    return this.buildingsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get facility details with full floor and meter hierarchy' })
  @ApiResponse({ status: 200, description: 'Facility details' })
  findOne(@Param('id') id: string) {
    return this.buildingsService.findOne(id);
  }
}

import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HierarchyService } from './hierarchy.service';

@ApiTags('hierarchy')
@Controller('hierarchy')
export class HierarchyController {
  constructor(private readonly hierarchyService: HierarchyService) {}

  @Get()
  @ApiOperation({ summary: 'Get complete 5-tier enterprise asset hierarchy tree' })
  @ApiResponse({ status: 200, description: 'Campus asset hierarchy tree' })
  getHierarchy() {
    return this.hierarchyService.getCampusHierarchy();
  }
}

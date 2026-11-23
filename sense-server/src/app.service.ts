import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      service: 'GridSense Energy Intelligence API',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}

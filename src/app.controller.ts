import { Controller, Get } from '@nestjs/common';
import * as process from 'process';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  health(): { time: string; ENV: any; uptime: number } {
    return {
      time: new Date().toString(),
      ENV: process.env.NODE_ENV,
      uptime: process.uptime(),
    };
  }
}

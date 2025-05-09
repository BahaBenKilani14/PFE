import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('endpoint')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
    getData() {
        return { message: 'Hello from the backend!' };
    }
}

import { Controller, Get,Render } from '@nestjs/common';
import { Res } from '@nestjs/common/decorators';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() res:Response) {
    res.render('home.ejs')
  }
}
 
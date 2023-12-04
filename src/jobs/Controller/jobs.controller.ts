import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { JobsService } from '../Service/jobs.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}
  @Get('/text')
  async text() {
  return await this.jobsService.addQueue()
  }
}

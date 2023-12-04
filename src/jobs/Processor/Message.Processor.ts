import { Process, Processor } from '@nestjs/bull';
import { JobsService } from '../Service/jobs.service';
import { Job } from 'bull';

@Processor('example-queue')
export class textProcessor {
  constructor(private readonly JobsService: JobsService) {}

  @Process()
  async processText(job: Job) {
    const { name, subject, message } = job.data;
    console.log({ data: job.data });
  }
}

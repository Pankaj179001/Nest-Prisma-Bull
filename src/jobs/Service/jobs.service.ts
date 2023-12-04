import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue, JobStatus } from 'bull';

@Injectable()
export class JobsService {
  constructor(@InjectQueue('example-queue') private textQueue: Queue) {}
  async addQueue() {
    const data = [
      { recipient: 'john1@example.com', subject: 'Hello', message: 'Hi John' },
      {
        recipient: 'jane@example.com',
        subject: 'Greetings',
        message: 'Hello Jane',
      },
    ];
   await this.textQueue.add('',{msg:"hy"});
    // await this.textQueue.clean(0, 'completed')//to clean queue
    return await this.textQueue.getJobCounts(); //get all jobs lists
    //  return await Promise.all(data.map((data) => this.textQueue.add("new",data))); 
  }
}

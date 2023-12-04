import { Module } from '@nestjs/common';
import { JobsService } from './Service/jobs.service';
import { JobsController } from './Controller/jobs.controller';
import { BullModule } from '@nestjs/bull';
import { textProcessor } from './Processor/Message.Processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'example-queue',
    }),
  ],
  controllers: [JobsController],
  providers: [JobsService, textProcessor],
})
export class JobsModule {}

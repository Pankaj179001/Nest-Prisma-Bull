import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookModule } from './books/module/book/book.module';
import { UserProfileModule } from './user/user_profile/user_profile.module';
import { AuthMiddleware } from './middlewares/auth/auth.middleware';
import { ProfileController } from './user/user_profile/controllers/profile/profile.controller';
import { BullModule } from '@nestjs/bull';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [UserModule, BookModule, UserProfileModule, JobsModule,BullModule.forRoot({
    redis: {
      host: '192.168.2.200',
      port: 6379,
    },
  }),
 ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude().forRoutes(ProfileController, {
      path: '/user/verification',
      method: RequestMethod.GET,
    });
  }
}

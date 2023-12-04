import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { userController } from './controllers/user.controller';
import { userService } from './services/user.service';


@Module({
  imports:[JwtModule.register({secret:"fjsjfwbfjksfksfkj3845",signOptions:{expiresIn:'1d'}})],
  controllers: [userController,],
  providers: [userService,PrismaService],
})
export class UserModule {}

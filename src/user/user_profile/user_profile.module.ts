import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProfileController } from './controllers/profile/profile.controller';
import { ProfileService } from './services/profile/profile.service';
// import { AuthorizationGaurd } from 'src/gaurds/auth/auth.guard';
@Module({
  controllers: [ProfileController],
  providers: [ProfileService,PrismaService,
    // {provide:AuthorizationGaurd,useClass:AuthorizationGaurd}
  ]
})
export class UserProfileModule {}
 
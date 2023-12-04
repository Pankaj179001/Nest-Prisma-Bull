import { Body, Controller, Post,Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { Prisma } from '@prisma/client';
import { createProfileDto } from 'src/DTO/createProfileDto';
// import { AuthorizationGaurd } from 'src/gaurds/auth/auth.guard';
import { ProfileService } from '../../services/profile/profile.service';

@Controller('profiles')
export class ProfileController {
 constructor(private profileService:ProfileService){}

@Post()
createProfile(@Body() insertedData:Prisma.profileUncheckedCreateInput){
 return this.profileService.createProfile(insertedData)
}

@Get()
// @UseGuards(AuthorizationGaurd)
getProfile(){
    return this.profileService.getProfile()
}


}
 
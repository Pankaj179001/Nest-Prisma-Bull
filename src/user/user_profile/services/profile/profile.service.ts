import { Injectable, Post } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { Prisma } from '@prisma/client';
import { createProfileDto } from 'src/DTO/createProfileDto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProfileService {
    constructor(private prisma:PrismaService){}
     

  async  createProfile(insertedData:Prisma.profileUncheckedCreateInput){
       const findUser=await this.prisma.user.findUnique({where:{id:insertedData.userId}})
       if(!findUser){
        throw new HttpException("user not fount with this userid ,cant create profile ",HttpStatus.BAD_REQUEST)
      }
       return  this.prisma.profile.create({data:insertedData,include:{user:true}}).catch(e=> {return `profile already exists, a user can have unique profile with userId`})

    }
    getProfile(){
     return this.prisma.user.findMany({include:{profile:true}})
    }
    //or
    // getProfile(){
    //   this.prisma.profile.findMany({include:{user:true}})
    // }
  
}
       
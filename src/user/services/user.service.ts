import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { loginDto } from 'src/DTO/loginDto';
import { userDto } from 'src/DTO/userDto';
import { PrismaService } from 'src/prisma.service';
import * as randomToken from 'rand-token'
import { Req, Res } from '@nestjs/common/decorators';
import { Request, Response } from 'express';
@Injectable()
export class userService{
   constructor(private prisma:PrismaService,private jwtservice:JwtService){}

  async createUser(userData:Prisma.userCreateInput):Promise<any>{
   //check if user already exists
   const alreadyExists=this.prisma.user.findUnique({where:{username:userData.username}})
   if(typeof alreadyExists==null){
      throw new HttpException("enter valid detail,all fields are mandatory",HttpStatus.BAD_REQUEST);
         }
return await  this.prisma.user.create({data:userData})
   } 
  

   getUsers(){
   return this.prisma.user.findMany()
   }


   updateUser(id:number,upateRecord:Prisma.userUpdateInput){
      
 return this.prisma.user.update({where:{id},data:{...upateRecord}})
   }


   deleteUsers(id:number){
   return this.prisma.user.delete({where:{id}})
   }


   getUserById(id:number){  
   return this.prisma.user.findUnique({
      where:{id}
   })
   }


  async userLogin(insertedDatafromBody:loginDto){
   const findingUserByusername=await this.prisma.user.findUnique({where:{username:insertedDatafromBody.username}})
   
   if (!findingUserByusername){
      throw new HttpException("user not found",HttpStatus.BAD_REQUEST)
   }
   // if password is hashed
   // const comapairingPassword=await bcrypt.compare(insertedDatafromBody.password,findingUserByusername.password)
if (!(insertedDatafromBody.password=findingUserByusername.password)){
 throw new HttpException("wrong password",HttpStatus.BAD_REQUEST)
}
const token=this.jwtservice.sign({id:findingUserByusername.id})//for this,,first register jwtModule in userModule
const refreshToken=randomToken.generate(30)
//updating usertable for user's token and refresh token
const dataToUpdate={token,refreshToken}
await this.prisma.user.update({where:{id:findingUserByusername.id},data:dataToUpdate})
return dataToUpdate
}

async tokenVerification(@Req() req:Request,@Res() res:Response){
   // console.log(req.cookies)
   const verifyingToken=await this.jwtservice.verify(req.cookies.jwt)
   const findUser=await this.prisma.user.findUnique({where:{id:verifyingToken.id}})
   console.log(findUser)
   return findUser

}

  
}
  
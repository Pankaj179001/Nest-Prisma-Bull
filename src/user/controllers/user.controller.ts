import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Delete, Put, Render, Req, Res,UseGuards } from '@nestjs/common/decorators';
import { Prisma } from '@prisma/client';
import { loginDto } from 'src/DTO/loginDto';
import { userDto } from 'src/DTO/userDto';
import { request, Request, response, Response } from 'express';
import { userService } from '../services/user.service';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class userController {
 constructor( private readonly userservices:userService,private jwtservice:JwtService){}

 @Get('register')
 registerPage(@Res() res:Response){
  res.render("registerUser")
 }
 

 @Post('login')
 async createLogin(@Body() insertedDatafromBody:loginDto,@Res(({passthrough:true}))res:Response){
   const tokens=await this.userservices.userLogin(insertedDatafromBody)
  res.cookie('jwt',tokens.token,{httpOnly:true}) 
  console.log(tokens)//requires cookie-parser
  return {message:'success',result:tokens};
 }

 @Post('register')
//  @Render("loginpage")
 createUserData(@Body() userData:Prisma.userCreateInput){
  console.log(userData)
    return this.userservices.createUser(userData)
 }
 @Get('verification')
//  @UseGuards(AuthorizationGaurd)
 async verifyingJwt(@Req() req:Request,@Res() res:Response){
return await this.userservices.tokenVerification(req,res)
}
@Get('logout')
Logout(@Res() res:Response){
    res.clearCookie('jwt')  
     res.end()
}
 @Get()
 getUser(){
  return this.userservices.getUsers()
 }
 @Get(':id')
 getUserById(@Param('id',ParseIntPipe) id:number ){
 return this.userservices.getUserById(id)
 }
 @Delete(':id')
 deleteUser(@Param('id',ParseIntPipe) id:number){
   return this.userservices.deleteUsers(id)
 }
 @Put(':id')
 updateUser(@Param('id',ParseIntPipe) id:number,@Body() upateRecord:Prisma.userUpdateInput ){
 return this.userservices.updateUser(id,upateRecord)
 }
 

}
 
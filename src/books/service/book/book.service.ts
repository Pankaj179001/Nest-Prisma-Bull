import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { booksDTO } from 'src/DTO/booksDto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BookService {
 constructor( private prisma:PrismaService){}


   async createBooks(payload:booksDTO){
    // console.log(payload)
     const find_user=await this.prisma.user.findUnique({where:{id:payload.authorId}})
 if (!find_user){
 throw new HttpException("user not fount with this userid ,cant create book ",HttpStatus.BAD_REQUEST)
 }
return this.prisma.books.create({data:payload,include:{author:true}})
 
  
    }
    findAll(){
        return this.prisma.user.findMany({
            include:{
                purchased_books:true
            }
        })
    }

}
//findAll function can also be written in this way
// findAll(){
//     return this.prisma.books.findMany({
//         include:{
//             author:true
//         }
//     })
// }
 
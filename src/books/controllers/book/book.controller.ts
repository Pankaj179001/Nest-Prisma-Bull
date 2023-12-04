import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';
import { Prisma } from '@prisma/client';
import { BookService } from 'src/books/service/book/book.service';
import { booksDTO } from 'src/DTO/booksDto';

@Controller('book')
export class BookController {
constructor(private booksService:BookService){}

    @Post(':id')
    //creating one to many relationship
    createbooks(@Body() payload:booksDTO){
        console.log(payload)
        return this.booksService.createBooks(payload)
    }

    @Get()
    findrecords(){
        return this.booksService.findAll()
    }
}
  
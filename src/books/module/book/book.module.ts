import { Module } from '@nestjs/common';
import { BookController } from 'src/books/controllers/book/book.controller';
import { BookService } from 'src/books/service/book/book.service';
import { PrismaService } from 'src/prisma.service';

@Module({
 controllers:[BookController],
 providers:[BookService,PrismaService]

})
export class BookModule {}

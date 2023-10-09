import { Module } from '@nestjs/common';
import { ToDosController } from './to-dos.controller';
import { ToDosService } from './to-dos.service';
import { ToDo, ToDoSchema } from './schemas/to-do.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ToDo.name, schema: ToDoSchema }]),
  ],
  controllers: [ToDosController],
  providers: [ToDosService],
})
export class ToDosModule {}

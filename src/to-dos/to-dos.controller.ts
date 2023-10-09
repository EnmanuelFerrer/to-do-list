import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ToDosService } from './to-dos.service';
import { CreateToDoDto } from './dto/create.to-do.dto';
import { UpdateToDoDto } from './dto/update.to-do.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('To-Dos')
@Controller('to-dos')
export class ToDosController {
  constructor(private readonly toDosService: ToDosService) {}

  @Get()
  findAllToDos() {
    return this.toDosService.findAllToDos();
  }

  @Get(':id')
  findOneToDo(@Param('id') id: string) {
    return this.toDosService.findOneToDo(id);
  }

  @Post()
  createToDo(@Body() newToDo: CreateToDoDto) {
    return this.toDosService.createToDo(newToDo);
  }

  @Put(':id')
  updateToDo(@Param('id') id: string, @Body() newData: UpdateToDoDto) {
    return this.toDosService.updateToDo(id, newData);
  }

  @Delete()
  deleteAllToDos(@Res() res) {
    return this.toDosService.deleteAll(res);
  }

  @Delete(':id')
  deleteToDo(@Param('id') id: string) {
    return this.toDosService.deleteToDo(id);
  }
}

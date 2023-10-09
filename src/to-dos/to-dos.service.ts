import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ToDo } from './schemas/to-do.schema';
import { CreateToDoDto } from './dto/create.to-do.dto';
import { UpdateToDoDto } from './dto/update.to-do.dto';
import { Validation } from './validation';

@Injectable()
export class ToDosService {
  constructor(
    @InjectModel(ToDo.name) private readonly toDoModel: Model<ToDo>,
  ) {}

  private validate: Validation = new Validation(this.toDoModel);

  /**
   * Find all the To-Dos in the database and returns it
   * @returns To-Do array
   */
  async findAllToDos(): Promise<ToDo[]> {
    await this.validate.databaseIsEmpty();
    return await this.toDoModel.find().exec();
  }

  /**
   * Returns one To-Do searching by given id
   * @param id To-Do Id
   * @returns To-Do
   */
  async findOneToDo(id: string): Promise<ToDo> {
    await this.validate.databaseIsEmpty();
    this.validate.idIsValid(id);
    const toDo: ToDo = await this.toDoModel.findById(id).exec();
    if (!toDo) throw new HttpException('To-Do not found', HttpStatus.NOT_FOUND);
    return toDo;
  }

  /**
   * Creates a new To-Do and saves it in the database
   * @param newToDoDto data for new To-Do
   * @returns new To-Do
   */
  async createToDo(newToDoDto: CreateToDoDto) {
    await this.validate.newToDoIsValid(newToDoDto);
    return await new this.toDoModel(newToDoDto).save();
  }

  /**
   * Updates a To-Do with new data searching by given id
   * @param id To-Do Id
   * @param updatedToDoData To-Do new data
   * @returns Updated To-Do
   */
  async updateToDo(id: string, updatedToDoData: UpdateToDoDto): Promise<ToDo> {
    await this.validate.databaseIsEmpty();
    this.validate.idIsValid(id);
    await this.validate.updatedToDoDataIsValid(updatedToDoData);

    const toDo: ToDo = await this.toDoModel
      .findByIdAndUpdate(id, updatedToDoData, { new: true })
      .exec();

    if (!toDo) throw new HttpException('To-Do not found', HttpStatus.NOT_FOUND);
    return toDo;
  }

  /**
   * Delete all the To-Dos in the database
   * @param res Response object
   * @returns Response message
   */
  async deleteAll(@Res() res) {
    await this.validate.databaseIsEmpty();
    await this.toDoModel.deleteMany().exec();

    // Returning an HTTP response with positive message
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'All To-Dos was deleted',
    });
  }

  /**
   * Delete one To-Do searchin by given id
   * @param id To-Do id
   * @returns Deleted To-Do
   */
  async deleteToDo(id: string): Promise<ToDo> {
    await this.validate.databaseIsEmpty();
    this.validate.idIsValid(id);

    const toDo: ToDo = await this.toDoModel.findByIdAndDelete(id).exec();
    if (!toDo) throw new HttpException('To-Do not found', HttpStatus.NOT_FOUND);
    return toDo;
  }
}

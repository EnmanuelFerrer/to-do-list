import { InjectModel } from '@nestjs/mongoose';
import { ToDo } from './schemas/to-do.schema';
import { Model, isValidObjectId } from 'mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateToDoDto } from './dto/create.to-do.dto';
import { UpdateToDoDto } from './dto/update.to-do.dto';

export class Validation {
  constructor(
    @InjectModel(ToDo.name) private readonly toDoModel: Model<ToDo>,
  ) {}

  /**
   * Validates if the database is empty.
   * @returns boolean | HttpException
   */
  async databaseIsEmpty(): Promise<boolean | HttpException> {
    const empty: boolean =
      (await this.toDoModel.count().exec()) == 0 ? true : false;

    if (empty == true)
      throw new HttpException('There are no To-Dos', HttpStatus.NOT_FOUND);

    return empty;
  }

  /**
   * Validates if the given id already is in ObjectId format.
   * @param id ObjectId
   * @returns void | HttpException
   */
  idIsValid(id: string): void | HttpException {
    if (!isValidObjectId(id))
      throw new HttpException(
        `The format of the given id is not valid`,
        HttpStatus.BAD_REQUEST,
      );
  }

  /**
   * Validates if the new To-Do Dto have unique title and
   * no repeated tags.
   * @param toDoDto CreateToDoDto object
   * @returns Promise<void | HttpException>
   */
  async newToDoIsValid(toDoDto: CreateToDoDto): Promise<void | HttpException> {
    // Validates if To-Do title exists in To-Dos
    if ((await this.toDoModel.findOne({ title: toDoDto.title }).exec()) != null)
      throw new HttpException(
        `The title have to be unique`,
        HttpStatus.BAD_REQUEST,
      );

    // Validates if To-Do have tags
    if (toDoDto.tags != undefined) {
      // Creates a set of unique elements based on ToDoDto's tags
      const set: Set<string> = new Set(toDoDto.tags);

      if (toDoDto.tags.length > set.size)
        throw new HttpException(
          `Tags can not be repeated`,
          HttpStatus.BAD_REQUEST,
        );
    }
  }

  /**
   * Validates if the new data for the To-Do have unique title and
   * no repeated tags.
   * @param toDoDto UreateToDoDto object
   * @returns Promise<void | HttpException>
   */
  async updatedToDoDataIsValid(
    toDoDto: UpdateToDoDto,
  ): Promise<void | HttpException> {
    // Validates if To-Do title exists in To-Dos
    if ((await this.toDoModel.findOne({ title: toDoDto.title }).exec()) != null)
      throw new HttpException(
        `The title have to be unique`,
        HttpStatus.BAD_REQUEST,
      );

    // Validates if To-Do have tags
    if (toDoDto.tags != undefined) {
      // Creates a set of unique elements based on tags inside ToDoDto
      const set: Set<string> = new Set(toDoDto.tags);
      
      if (toDoDto.tags.length > set.size)
        throw new HttpException(
          `Tags can not be repeated`,
          HttpStatus.BAD_REQUEST,
        );
    }
  }
}

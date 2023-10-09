import { CreateToDoDto } from './create.to-do.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateToDoDto extends PartialType(CreateToDoDto) {}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class BaseToDoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The title of the To-Do',
    type: String,
    default: undefined,
    uniqueItems: true,
    required: true,
    example: 'Go to the doctor',
  })
  readonly title: string;

  @ApiProperty({
    description: 'Descriptive message for the To-Do',
    type: String,
    default: undefined,
    uniqueItems: false,
    required: false,
    example: 'I have to go because my neck hurts',
  })
  readonly description: string;

  @ApiProperty({
    description:
      'The completed statement of the To-Do that indicates if To-Do is completed or not',
    type: Boolean,
    default: false,
    required: false,
    example: false,
  })
  readonly completed: boolean;

  @ApiProperty({
    description: 'Some tags for the To-Do',
    type: [String],
    default: undefined,
    uniqueItems: false,
    required: false,
    example: `["Doctor", "Neck", "Health"]`,
  })
  readonly tags: string[];
}

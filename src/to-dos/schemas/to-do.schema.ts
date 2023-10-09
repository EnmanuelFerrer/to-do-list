import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ToDoDocument = Document & ToDo;

@Schema({
  timestamps: true,
})
export class ToDo {
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  title: string;


  @Prop({ type: String })
  description: string;

  @Prop({ type: Boolean, default: false })
  completed: boolean;

  @Prop({ type: [String] })
  tags: string[];
}

export const ToDoSchema = SchemaFactory.createForClass(ToDo);

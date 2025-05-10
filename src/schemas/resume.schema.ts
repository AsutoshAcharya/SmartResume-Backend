import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type ResumeDocument = HydratedDocument<Resume>;
@Schema({ timestamps: true })
export class Resume {
  @Prop()
  title: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  addedBy: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  resume: Record<string, any>;
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);

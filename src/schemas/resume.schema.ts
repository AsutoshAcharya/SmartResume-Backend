import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ResumeDocument = HydratedDocument<Resume>;
@Schema({ timestamps: true })
export class Resume {
  @Prop()
  title: string;
  @Prop({ type: mongoose.Schema.Types.Mixed })
  resume: Record<string, any>;
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);

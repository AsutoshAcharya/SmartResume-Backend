import { isNotEmpty, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateResumeDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsObject()
  resume: Record<string, any>;
}
export class UpdateResumeDto extends CreateResumeDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}

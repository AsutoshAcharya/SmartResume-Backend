import { IsHash, IsNotEmpty, isString, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  email: string;
  @IsString()
  password: string;
}

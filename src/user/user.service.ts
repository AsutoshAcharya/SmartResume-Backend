import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable({})
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>, //same name given in the user.module
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    let newUser: UserDocument;
    const exists = await this.userModel.findOne({
      $or: [{ name: createUserDto.name }, { email: createUserDto.email }],
    });
    if (exists) {
      return {
        status: 409,
        message: `User with name or email already exists`,
      };
    }
    console.log(createUserDto);
    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
    newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    await newUser.save();
    return {
      status: 201,
      message: `User ${newUser.name} has been registered successfully`,
    };
  }
}

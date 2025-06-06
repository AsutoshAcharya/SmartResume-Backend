import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto, LoginDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { pick } from 'src/helpers';

@Injectable({})
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>, //same name given in the user.module
    private jwtService: JwtService,
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    let newUser: UserDocument;
    const exists = await this.userModel.findOne({
      $or: [{ name: createUserDto.name }, { email: createUserDto.email }],
    });
    if (exists) {
      throw new ConflictException('User already exists');
    }

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

  async loginUser(loginDto: LoginDto) {
    const user = await this.userModel.findOne({ email: loginDto.email });
    if (!user) throw new NotFoundException('User is not registered');

    const isMatched = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatched) throw new UnauthorizedException('Invalid password');

    const token = await this.jwtService.signAsync({
      id: user._id,
      name: user.name,
    });
    return {
      status: 201,
      message: 'Login Successful',
      data: { ...pick(user, '_id', 'name', 'email', 'avatar'), token },
    };
  }
}

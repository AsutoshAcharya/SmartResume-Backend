import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Resume } from 'src/schemas/resume.schema';
import { CreateResumeDto, UpdateResumeDto } from './dto/resume.dto';
import { Some } from 'src/helpers';

@Injectable()
export class ResumeService {
  constructor(@InjectModel(Resume.name) private resumeModel: Model<Resume>) {}

  async createResume(userId: string, createResumeDto: CreateResumeDto) {
    const newResume = await this.resumeModel.create({
      ...createResumeDto,
      addedBy: userId,
    });
    newResume.save();
    return {
      status: 200,
      message: `Resume added successfully`,
    };
  }

  async getResumeById(userId: string) {
    const allUserSpecificResume = await this.resumeModel.find({
      _id: userId,
    });

    return {
      status: 200,
      data: Some.Array(allUserSpecificResume),
      message: 'User specific resume fetched successfully',
    };
  }

  async updateResume(userId: string, updateResumeDto: UpdateResumeDto) {
    // if (userId !== updateResumeDto.id)
    //   return new UnauthorizedException("You can't edit this resume");
    const resume = await this.resumeModel.findById(updateResumeDto.id);

    if (!resume) {
      throw new NotFoundException('Resume not found');
    }
    if (Some.String(resume.addedBy) !== userId)
      throw new UnauthorizedException("You can't edit this resume");
    const updatedResume = await this.resumeModel.updateOne(
      { _id: updateResumeDto.id },
      { $set: updateResumeDto },
    );
    return {
      status: 200,
      message: 'Resume has been updated',
    };
  }

  async getAllResume() {
    const allResume = await this.resumeModel.find();
    return {
      status: 200,
      data: Some.Array(allResume),
      message: 'All Resume Fetched',
    };
  }
}

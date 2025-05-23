import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtDto } from 'src/user/dto/user.dto';
import { CreateResumeDto, UpdateResumeDto } from './dto/resume.dto';

@Controller('resume')
export class ResumeController {
  constructor(private resumeService: ResumeService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  createResume(
    @Request() req: Request & { user: JwtDto },
    @Body() createResumeDto: CreateResumeDto,
  ) {
    // console.log(req?.user);
    return this.resumeService.createResume(req?.user?.id, createResumeDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('get_all/:userId')
  getResumeByUserId(@Param('userId') userId: string) {
    // need to pass userId inside Param decorator
    // console.log('User ID:', userId);
    return this.resumeService.getResumeByUserId(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update')
  updateResume(
    @Request() req: Request & { user: JwtDto },
    @Body() updateResumeDto: UpdateResumeDto,
  ) {
    // console.log(req?.user?.id);
    return this.resumeService.updateResume(req?.user?.id, updateResumeDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('get_all')
  getAllResume() {
    return this.resumeService.getAllResume();
  }
}

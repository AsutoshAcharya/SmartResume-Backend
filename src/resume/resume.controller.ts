import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtDto } from 'src/user/dto/user.dto';

@Controller('resume')
export class ResumeController {
  constructor(private resumeService: ResumeService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  createResume(@Request() req: Request & { user: JwtDto }) {
    console.log(req?.user);
    return `you can now add`;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('get_all/:userId')
  getResumeByUserId() {}

  @UseGuards(AuthGuard('jwt'))
  @Post('update/:id')
  updateResume() {}

  @UseGuards(AuthGuard('jwt'))
  @Get('get_all')
  getAllResume() {
    return this.resumeService.getAllResume();
  }
}

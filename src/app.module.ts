import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ResumeModule } from './resume/resume.module.js';

@Module({
  imports: [ResumeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

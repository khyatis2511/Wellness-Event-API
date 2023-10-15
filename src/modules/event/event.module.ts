import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/modules/prisma/prisma.service';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [],
  providers: [EventService, PrismaService],
  controllers: [EventController],
  exports: [EventService],
})
export class EventModule {}

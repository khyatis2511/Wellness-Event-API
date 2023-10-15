import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Request,
  UseGuards,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { EventService } from './event.service';
import { USER_ROLE } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Role } from 'src/shared/decorators/roles.decorator';

const moduleName = 'Event';

@ApiTags('Event')
@Controller('event')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class EventController {
  constructor(private eventService: EventService) {}

  @HttpCode(HttpStatus.OK)
  @Role(USER_ROLE.HR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: `Create ${moduleName}` })
  @Post('')
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventService.createEvent(createEventDto);
  }

  @Role(USER_ROLE.VENDER)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: `Update ${moduleName}` })
  @Put(':eventId')
  eventVenderAction(
    @Body() updateEventDto: UpdateEventDto,
    @Param('eventId') eventId: string,
  ) {
    return this.eventService.eventVenderAction({ updateEventDto, eventId });
  }

  @ApiOperation({ summary: `Get ${moduleName} List` })
  @Get('')
  getEvent(@Request() req) {
    return this.eventService.getEvent(req.user);
  }
}

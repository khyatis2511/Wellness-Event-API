import { NotFoundException, Injectable } from '@nestjs/common';
import { USER_ROLE } from '@prisma/client';
import { PrismaService } from 'src/shared/modules/prisma/prisma.service';
import { DateTime } from 'luxon';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async createEvent(createEventDto): Promise<any> {
    // console.log('Event Dto : ', createEventDto);
    const result = await this.prisma.event.create({
      data: {
        ...createEventDto,
      },
    });
    return result;
    // console.log('Create Event : ', result);
  }

  async eventVenderAction({ updateEventDto, eventId }): Promise<any> {
    const result = await this.prisma.event.findFirst({
      where: {
        id: eventId,
      },
    });
    // console.log('result: update : ', result);
    if (result) {
      const data = await this.prisma.event.update({
        where: {
          id: result.id,
        },
        data: {
          updatedAt: DateTime.utc().toISO(),
          ...updateEventDto,
        },
      });
      return data;
      // console.log('if update data: ', data);
    } else {
      throw new NotFoundException();
    }
    // console.log('update event dto : ', updateEventDto);
  }

  async getEvent(user): Promise<any> {
    // console.log('user : ', user);
    if (user.role === USER_ROLE.HR) {
      return await this.getHREventList(user.id);
    }
    if (user.role === USER_ROLE.VENDER) {
      return await this.getVenderEventList(user.id);
    }
  }

  private async getHREventList(id: string) {
    return await this.prisma.event.findMany({
      where: {
        createdBy: id,
      },
    });
  }

  private async getVenderEventList(id: string) {
    return await this.prisma.event.findMany({
      where: {
        venderId: id,
      },
    });
  }
}

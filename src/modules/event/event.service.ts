import { NotFoundException, Injectable } from '@nestjs/common';
import { USER_ROLE } from '@prisma/client';
import { PrismaService } from 'src/shared/modules/prisma/prisma.service';
import { DateTime } from 'luxon';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async createEvent(createEventDto): Promise<any> {
    const result = await this.prisma.event.create({
      data: {
        ...createEventDto,
      },
    });
    if (result) {
      return {
        status: 'success',
        data: result,
      };
    } else {
      throw new NotFoundException('Record could not be created');
    }
  }

  async eventVendorAction({ updateEventDto, eventId }): Promise<any> {
    const result = await this.prisma.event.findFirst({
      where: {
        id: eventId,
      },
    });
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
      return {
        status: 'success',
        data: data,
      };
    } else {
      throw new NotFoundException();
    }
  }

  async getEvent(user): Promise<any> {
    if (user.role === USER_ROLE.HR) {
      return await this.getHREventList(user.id);
    }
    if (user.role === USER_ROLE.VENDOR) {
      return await this.getVendorEventList(user.id);
    }
  }

  private async getHREventList(id: string) {
    return await this.prisma.event.findMany({
      where: {
        createdBy: id,
      },
      include: {
        creator: true,
        vendor: true,
      },
    });
  }

  private async getVendorEventList(id: string) {
    return await this.prisma.event.findMany({
      where: {
        vendorId: id,
      },
      include: {
        creator: true,
        vendor: true,
      },
    });
  }
}

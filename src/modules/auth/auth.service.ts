import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/modules/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { userData } from './constants';
import { USER_ROLE } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginDto): Promise<any> {
    const { email, password } = loginDto;
    const user = await this.prisma.user.findFirst({
      where: { email: email },
    });
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.sign(payload),
    };
  }

  async signUp(): Promise<any> {
    // static register api
    const user = await this.prisma.user.createMany({
      data: userData,
    });

    if (user) {
      return {
        status: 'success',
        message: 'Users Registered Successfully',
      };
    } else {
      return {
        status: 'error',
        message: 'Something went wrong! Unable to Register User',
      };
    }
  }

  async whoAmI(user): Promise<any> {
    const userData = await this.prisma.user.findFirst({
      where: {
        id: user.id,
      },
    });

    if (userData) {
      return {
        status: 'success',
        data: {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          companyName: userData?.companyName || null,
        },
      };
    } else {
      throw new NotFoundException();
    }
  }

  async vendorList(): Promise<any> {
    const vendors = await this.prisma.user.findMany({
      where: {
        role: USER_ROLE.VENDOR,
      },
    });

    if (vendors && vendors?.length > 0) {
      const vendorData = vendors.map((vendor) => ({
        id: vendor.id,
        name: vendor.name,
        email: vendor.email,
        role: vendor.role,
      }));
      return {
        status: 'success',
        data: vendorData,
      };
    } else {
      throw new NotFoundException();
    }
  }
}

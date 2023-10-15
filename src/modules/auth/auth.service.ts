import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/shared/modules/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { userData } from './constants';

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
    // console.log('sign up data : ', signUpData);

    const user = await this.prisma.user.createMany({
      data: userData,
    });

    // console.log('user created : ', user);
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
}

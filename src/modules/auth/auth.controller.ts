import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { USER_ROLE } from '@prisma/client';
import { Role } from 'src/shared/decorators/roles.decorator';
import { RolesGuard } from './guards/role.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: `Login` })
  @Post('login')
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: `Register` })
  @Post('register')
  signUp() {
    return this.authService.signUp();
  }

  @ApiOperation({ summary: `Logged in user data` })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/who-am-i')
  whoAmI(@Request() req) {
    return this.authService.whoAmI(req.user);
  }

  @ApiOperation({ summary: `Get Vendors List` })
  @ApiBearerAuth()
  @Role(USER_ROLE.HR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/vendors')
  vendorList() {
    return this.authService.vendorList();
  }
}

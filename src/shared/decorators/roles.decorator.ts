import { SetMetadata } from '@nestjs/common';
import { USER_ROLE } from '@prisma/client';

export const ROLES_KEY = 'role';
export const Role = (role: USER_ROLE) => SetMetadata(ROLES_KEY, role);

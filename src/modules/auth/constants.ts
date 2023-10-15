import { USER_ROLE } from '@prisma/client';

export const jwtConstants = {
  secret: 'This is a secret',
  expiresIn: '5h',
};

export const userData = [
  {
    email: 'nisha@gmail.com',
    name: 'nisha',
    role: USER_ROLE.HR,
    password: 'nisha@123',
    companyName: 'neno tech',
  },
  {
    email: 'rani@gmail.com',
    name: 'rani',
    role: USER_ROLE.VENDER,
    password: 'rani@123',
  },
  {
    email: 'disha@gmail.com',
    name: 'Disha',
    role: USER_ROLE.VENDER,
    password: 'disha@123',
  },
  {
    email: 'seema@gmail.com',
    name: 'seema',
    role: USER_ROLE.VENDER,
    password: 'seema@123',
  },
  {
    email: 'nick@gmail.com',
    name: 'nick',
    role: USER_ROLE.HR,
    password: 'nick@123',
    companyName: 'CR Creto',
  },
];

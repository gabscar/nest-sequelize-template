import { Prisma } from '@prisma/client';
import { userSeedData } from './user.seed';

export const userPrismaSeedData: Prisma.UserCreateInput[] = userSeedData.map(
  (user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
  }),
);

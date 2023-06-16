import { Prisma, PrismaClient } from '@prisma/client';

import { userPrismaSeedData } from './data/user/user.data';

const prisma = new PrismaClient();

async function execute() {
  await prisma.$transaction([
    ...seed<Prisma.UserCreateInput>(prisma, 'User', userPrismaSeedData),
  ]);
}

function seed<T extends { id?: string }>(
  client: PrismaClient,
  model: Prisma.ModelName,
  dataArray: T[],
): Prisma.PrismaPromise<T>[] {
  const seedData = dataArray.map((data) =>
    client[model].upsert({
      where: { id: data.id },
      create: data,
      update: data,
    }),
  );
  return seedData;
}

execute()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seeds inserted successfully!');
  })
  .catch(async (e) => {
    console.error('Error inserting seeds!', e);
    await prisma.$disconnect();
    process.exit(1);
  });

import { prismaClient as prisma } from '@resyl/prisma';

async function main() {
  await prisma.user.deleteMany({});
  console.log('DELETED ALL USERS');
}
main().finally(() => prisma.$disconnect());


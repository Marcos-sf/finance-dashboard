import { afterAll } from '@jest/globals';
import prisma from '../config/prisma';

afterAll(async () => {
  await prisma.$disconnect();
});

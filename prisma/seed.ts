import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // Clear existing data (optional, protects against duplicate unique constraints when running multiple times)
  await prisma.record.deleteMany({});
  await prisma.user.deleteMany({});

  const passwordHash = await bcrypt.hash('password123', 10);

  // 1. Create Admin
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: passwordHash,
      role: 'Admin',
      status: 'Active'
    }
  });

  // 2. Create Analyst
  const analyst = await prisma.user.create({
    data: {
      name: 'Analyst User',
      email: 'analyst@example.com',
      password: passwordHash,
      role: 'Analyst',
      status: 'Active'
    }
  });

  // 3. Create Viewer
  const viewer = await prisma.user.create({
    data: {
      name: 'Viewer User',
      email: 'viewer@example.com',
      password: passwordHash,
      role: 'Viewer',
      status: 'Active'
    }
  });

  // 4. Create dummy records tied to Admin
  await prisma.record.createMany({
    data: [
      { amount: 5000, type: 'Income', category: 'Salary', date: new Date(), notes: 'Monthly income', userId: admin.id },
      { amount: 200, type: 'Expense', category: 'Groceries', date: new Date(), notes: 'Weekly groceries', userId: admin.id },
      { amount: 1500, type: 'Income', category: 'Freelance', date: new Date(), notes: 'Project payment', userId: admin.id },
      { amount: 50, type: 'Expense', category: 'Subscriptions', date: new Date(), notes: 'Netflix & Spotify', userId: admin.id },
      { amount: 100, type: 'Expense', category: 'Utilities', date: new Date(), notes: 'Electricity bill', userId: admin.id },
      { amount: 300, type: 'Expense', category: 'Travel', date: new Date('2023-11-01'), notes: 'Flight ticket', userId: admin.id },
    ]
  });

  console.log('Database seeding complete! 🚀');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

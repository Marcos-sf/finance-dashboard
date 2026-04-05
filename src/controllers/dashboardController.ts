import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const getSummary = async (req: Request, res: Response) => {
  const records = await prisma.record.findMany({
    select: { amount: true, type: true }
  });

  let totalIncome = 0;
  let totalExpense = 0;

  records.forEach((r: any) => {
    if (r.type === 'Income') totalIncome += r.amount;
    else if (r.type === 'Expense') totalExpense += r.amount;
  });

  const netBalance = totalIncome - totalExpense;

  res.status(200).json({
    status: 'success',
    data: { totalIncome, totalExpense, netBalance }
  });
};

export const getCategoryTotals = async (req: Request, res: Response) => {
  const records = await prisma.record.findMany({
    select: { amount: true, type: true, category: true }
  });

  const categoryTotals: Record<string, { income: number; expense: number }> = {};

  records.forEach((r: any) => {
    if (!categoryTotals[r.category]) {
      categoryTotals[r.category] = { income: 0, expense: 0 };
    }
    if (r.type === 'Income') {
      categoryTotals[r.category].income += r.amount;
    } else {
      categoryTotals[r.category].expense += r.amount;
    }
  });

  res.status(200).json({ status: 'success', data: categoryTotals });
};

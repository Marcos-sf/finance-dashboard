import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { NotFoundError, ForbiddenError } from '../utils/errors';
import { AuthRequest } from '../middleware/authMiddleware';

export const createRecord = async (req: AuthRequest, res: Response) => {
  const { amount, type, category, date, notes } = req.body;

  const record = await prisma.record.create({
    data: {
      amount,
      type,
      category,
      date: new Date(date || new Date()),
      notes,
      userId: req.user.id
    }
  });

  res.status(201).json({ status: 'success', data: record });
};

export const getRecords = async (req: AuthRequest, res: Response) => {
  const { type, category, startDate, endDate, page = '1', limit = '10' } = req.query;

  const filters: any = {};
  if (type) filters.type = type;
  if (category) filters.category = category;
  if (startDate || endDate) {
    filters.date = {};
    if (startDate) filters.date.gte = new Date(startDate as string);
    if (endDate) filters.date.lte = new Date(endDate as string);
  }

  const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
  const take = parseInt(limit as string);

  const [records, totalItems] = await Promise.all([
    prisma.record.findMany({
      where: filters,
      orderBy: { date: 'desc' },
      skip,
      take,
    }),
    prisma.record.count({ where: filters })
  ]);

  res.status(200).json({ 
    status: 'success', 
    data: records,
    metadata: {
      totalItems,
      totalPages: Math.ceil(totalItems / take),
      currentPage: parseInt(page as string)
    }
  });
};

export const getRecordById = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const record = await prisma.record.findUnique({ where: { id: parseInt(id as string) } });
  if (!record) throw new NotFoundError('Record not found');

  res.status(200).json({ status: 'success', data: record });
};

export const updateRecord = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { amount, type, category, date, notes } = req.body;

  const record = await prisma.record.findUnique({ where: { id: parseInt(id as string) } });
  if (!record) throw new NotFoundError('Record not found');

  const updatedRecord = await prisma.record.update({
    where: { id: parseInt(id as string) },
    data: {
      ...(amount && { amount }),
      ...(type && { type }),
      ...(category && { category }),
      ...(date && { date: new Date(date) }),
      ...(notes && { notes }),
    }
  });

  res.status(200).json({ status: 'success', data: updatedRecord });
};

export const deleteRecord = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const record = await prisma.record.findUnique({ where: { id: parseInt(id as string) } });
  if (!record) throw new NotFoundError('Record not found');

  await prisma.record.delete({ where: { id: parseInt(id as string) } });

  res.status(200).json({ status: 'success', message: 'Record deleted successfully' });
};

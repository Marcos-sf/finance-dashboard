import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { NotFoundError } from '../utils/errors';

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, status: true, createdAt: true }
  });

  res.status(200).json({ status: 'success', data: users });
};

export const updateUserRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role, status } = req.body;

  const user = await prisma.user.findUnique({ where: { id: parseInt(id as string) } });
  if (!user) {
    throw new NotFoundError('User not found');
  }

  const updatedUser = await prisma.user.update({
    where: { id: parseInt(id as string) },
    data: { 
      ...(role && { role }), 
      ...(status && { status }) 
    },
    select: { id: true, name: true, email: true, role: true, status: true }
  });

  res.status(200).json({ status: 'success', data: updatedUser });
};

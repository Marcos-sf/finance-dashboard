import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['Viewer', 'Analyst', 'Admin']).optional()
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(1, 'Password is required'),
  })
});

export const updateRoleSchema = z.object({
  params: z.object({
    id: z.string()
  }),
  body: z.object({
    role: z.enum(['Viewer', 'Analyst', 'Admin']),
    status: z.enum(['Active', 'Inactive']).optional()
  })
});

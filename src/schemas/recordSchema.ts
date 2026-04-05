import { z } from 'zod';

export const createRecordSchema = z.object({
  body: z.object({
    amount: z.number().positive('Amount must be positive'),
    type: z.enum(['Income', 'Expense']),
    category: z.string().min(1, 'Category is required'),
    date: z.string().datetime().optional()
      .or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')),
    notes: z.string().optional()
  })
});

export const updateRecordSchema = z.object({
  params: z.object({
    id: z.string()
  }),
  body: z.object({
    amount: z.number().positive().optional(),
    type: z.enum(['Income', 'Expense']).optional(),
    category: z.string().optional(),
    date: z.string().datetime().optional()
      .or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).optional(),
    notes: z.string().optional()
  })
});

export const fetchRecordsSchema = z.object({
  query: z.object({
    type: z.enum(['Income', 'Expense']).optional(),
    category: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional()
  })
});

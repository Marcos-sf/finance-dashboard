import { Response, NextFunction } from 'express';
import { ForbiddenError } from '../utils/errors';
import { AuthRequest } from './authMiddleware';

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    
    if (!userRole || !allowedRoles.includes(userRole)) {
      throw new ForbiddenError(`Role ${userRole || 'Unknown'} is not authorized to perform this action`);
    }

    next();
  };
};

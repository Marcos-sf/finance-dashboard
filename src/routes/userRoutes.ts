import { Router } from 'express';
import { getAllUsers, updateUserRole } from '../controllers/userController';
import { authenticate } from '../middleware/authMiddleware';
import { authorizeRoles } from '../middleware/roleMiddleware';
import { validateRequest } from '../middleware/validate';
import { updateRoleSchema } from '../schemas/userSchema';

const router = Router();

router.use(authenticate);
router.use(authorizeRoles('Admin')); // Only admins can manage users

router.get('/', getAllUsers);
router.put('/:id/role', validateRequest(updateRoleSchema), updateUserRole);

export default router;

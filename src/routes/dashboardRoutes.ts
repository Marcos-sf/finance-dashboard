import { Router } from 'express';
import { getSummary, getCategoryTotals } from '../controllers/dashboardController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticate);
// Viewers, Analysts, and Admins can view dashboards
// So no explicit authorizeRoles is needed, just authentication

router.get('/summary', getSummary);
router.get('/category-totals', getCategoryTotals);

export default router;

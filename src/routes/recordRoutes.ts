import { Router } from 'express';
import { createRecord, getRecords, getRecordById, updateRecord, deleteRecord } from '../controllers/recordController';
import { authenticate } from '../middleware/authMiddleware';
import { authorizeRoles } from '../middleware/roleMiddleware';
import { validateRequest } from '../middleware/validate';
import { createRecordSchema, updateRecordSchema, fetchRecordsSchema } from '../schemas/recordSchema';

const router = Router();

router.use(authenticate);

// Analyst and Admin can read all records
router.get('/', authorizeRoles('Analyst', 'Admin'), validateRequest(fetchRecordsSchema), getRecords);
router.get('/:id', authorizeRoles('Analyst', 'Admin'), getRecordById);

// Admin and Analyst can create records (Viewer cannot)
router.post('/', authorizeRoles('Analyst', 'Admin'), validateRequest(createRecordSchema), createRecord);

// Only Admin can update or delete
router.put('/:id', authorizeRoles('Admin'), validateRequest(updateRecordSchema), updateRecord);
router.delete('/:id', authorizeRoles('Admin'), deleteRecord);

export default router;

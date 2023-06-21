import { Router } from 'express';
import { AdminController } from '../controllers/admin.controler';
import { checkIfIsAdminValidator } from '../validators/checkIfIsAdmin.validator';
import { checksIfItDoesNotDuplicateUserRecordsValidator } from '../../user-base/validators/checksIfItDoesNotDuplicateUserRecords.validator';

export const adminRoutes = () => {
    const router = Router();

    router.post(
        '/',
        [checksIfItDoesNotDuplicateUserRecordsValidator],
        new AdminController().create
    );
    router.get('/all', new AdminController().findAll);

    return router;
};

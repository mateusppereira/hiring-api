import { Router } from 'express';
import { AdminController } from '../controllers/admin.controler';
import { checkIfIsAdminValidator } from '../validators/checkIfIsAdmin.validator';
import { checksIfItDoesNotDuplicateUserRecordsValidator } from '../../user-base/validators/checksIfItDoesNotDuplicateUserRecords.validator';

export const adminRoutes = () => {
    const router = Router();

    router.post(
        '/',
        [checkIfIsAdminValidator, checksIfItDoesNotDuplicateUserRecordsValidator],
        new AdminController().create
    );
    router.get('/', checkIfIsAdminValidator, new AdminController().findAll);

    return router;
};

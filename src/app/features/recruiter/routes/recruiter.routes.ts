import { Router } from 'express';
import { checksIfItDoesNotDuplicateUserRecordsValidator } from '../../user-base/validators/checksIfItDoesNotDuplicateUserRecords.validator';
import { RecruiterController } from '../controllers/recruiter.controller';
import { checkIfIsAdminValidator } from '../../admin/validators/checkIfIsAdmin.validator';

export const recruiterRoutes = () => {
    const router = Router();

    router.post(
        '/',
        [checkIfIsAdminValidator, checksIfItDoesNotDuplicateUserRecordsValidator],
        new RecruiterController().create
    );
    router.get('/', checkIfIsAdminValidator, new RecruiterController().findRecruiters);

    return router;
};

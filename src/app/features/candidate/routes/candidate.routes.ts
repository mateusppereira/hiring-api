import { Router } from 'express';
import { checksIfItDoesNotDuplicateUserRecordsValidator } from '../../user-base/validators/checksIfItDoesNotDuplicateUserRecords.validator';
import { CandidateController } from '../controllers/candidate.controller';
import { checkIfIsRecruiterOrAdminValidator } from '../../recruiter/validators/checkIfIsRecruiterOrAdmin.validator';

export const candidateRoutes = () => {
    const router = Router();

    router.post(
        '/',
        [checkIfIsRecruiterOrAdminValidator, checksIfItDoesNotDuplicateUserRecordsValidator],
        new CandidateController().create
    );
    router.get('/', checkIfIsRecruiterOrAdminValidator, new CandidateController().findCandidates);

    return router;
};

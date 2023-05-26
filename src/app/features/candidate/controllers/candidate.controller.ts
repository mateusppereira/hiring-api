import { Request, Response } from 'express';
import { UserBaseRepository } from '../../user-base/repository/user.repository';
import { ApiError } from '../../../shared/utils/api.error';
import { CreateCandidateUseCase } from '../usescases/createCandidate.usecase';
import { ListCandidatesUsecase } from '../usescases/listCandidates.usercase';

export class CandidateController {
    public async create(req: Request, res: Response) {
        try {
            const usecase = new CreateCandidateUseCase(new UserBaseRepository());
            const result = await usecase.execute(req.body);

            return res.status(result.code).send(result);
        } catch (error: any) {
            ApiError.serverError(res, error);
        }
    }

    public async findCandidates(req: Request, res: Response) {
        try {
            const usecase = new ListCandidatesUsecase(new UserBaseRepository());
            const result = await usecase.execute();

            return res.status(result.code).send(result);
        } catch (error: any) {
            ApiError.serverError(res, error);
        }
    }
}

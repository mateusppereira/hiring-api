import { Request, Response } from 'express';
import { CreateRecruiterUseCase } from '../usecases/createRecruiter.usecase';
import { UserBaseRepository } from '../../user-base/repository/user.repository';
import { ApiError } from '../../../shared/utils/api.error';
import { ListRecruitersUsecase } from '../usecases/listRecruiters.usecase';

export class RecruiterController {
    public async create(req: Request, res: Response) {
        try {
            const usecase = new CreateRecruiterUseCase(new UserBaseRepository());
            const result = await usecase.execute(req.body);

            return res.status(result.code).send(result);
        } catch (error: any) {
            ApiError.serverError(res, error);
        }
    }

    public async findRecruiters(req: Request, res: Response) {
        try {
            const usecase = new ListRecruitersUsecase(new UserBaseRepository());
            const result = await usecase.execute();

            return res.status(result.code).send(result);
        } catch (error: any) {
            ApiError.serverError(res, error);
        }
    }
}

import { Request, Response } from 'express';
import { CreateAdminUseCase } from '../usecases/createAdmin.usecase';
import { UserBaseRepository } from '../../user-base/repository/user.repository';
import { AdminSeeksAllUsersUseCase } from '../usecases/adminSeeksAllUsers.usecase';
import { ApiError } from '../../../shared/utils/api.error';
import { CacheRepository } from '../../../shared/database/cache-repository';

export class AdminController {
    public async create(req: Request, res: Response) {
        try {
            const usecase = new CreateAdminUseCase(new UserBaseRepository());
            const result = await usecase.execute(req.body);

            return res.status(result.code).send(result);
        } catch (error: any) {
            ApiError.serverError(res, error);
        }
    }

    public async findAll(req: Request, res: Response) {
        try {
            const usecase = new AdminSeeksAllUsersUseCase(
                new UserBaseRepository(),
                new CacheRepository()
            );
            const result = await usecase.execute();

            return res.status(result.code).send(result);
        } catch (error: any) {
            ApiError.serverError(res, error);
        }
    }
}

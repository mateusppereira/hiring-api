import { Request, Response } from 'express';
import { ListVacanciesUsecase } from '../usecases/list-vacancies.usecase';
import { ApiError } from '../../../shared/utils/api.error';
import { CreateVacancyUsecase } from '../usecases/create-vacancy.usecase';
import { JwtAdapter } from '../../../shared/utils/jwt.adapter';
import { CheckLoginDTO } from '../../auth/usercases/refresnAuth.usecase';
import { VacancyRepository } from '../repository/vacancy';
import { UserBaseRepository } from '../../user-base/repository/user.repository';

export class VacancyController {
    public async list(req: Request, res: Response) {
        try {
            const usecase = new ListVacanciesUsecase();
            const result = await usecase.execute();

            return res.status(result.code).send(result);
        } catch (error: any) {
            ApiError.serverError(res, error);
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const { description, companyName, dtLimite, indActive, maxCandidates } = req.body;

            const user = req.cookies['Authorization'] as string;
            const usuarioDecoded = JwtAdapter.decodeToken<CheckLoginDTO>(user);

            const usecase = new CreateVacancyUsecase(
                new VacancyRepository(),
                new UserBaseRepository()
            );
            const result = await usecase.execute({
                description,
                companyName,
                dtLimite,
                indActive,
                recruiter: usuarioDecoded.uuid,
                maxCandidates,
            });

            return res.status(result.code).send(result);
        } catch (error: any) {
            ApiError.serverError(res, error);
        }
    }
}

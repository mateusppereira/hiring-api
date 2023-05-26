import { NextFunction, Request, Response } from 'express';
import { UserBaseRepository } from '../repository/user.repository';
import { badRequestError, serverError } from '../../../shared/utils/helpers';

export const checksIfItDoesNotDuplicateUserRecordsValidator = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, email } = req.body;

        const usecase = new UserBaseRepository();
        const result = await usecase.findUser(name, email);

        // User não existe! pode seguir com a requisição
        if (!result) {
            return next();
        }

        return badRequestError(res, `User ${name} já está cadastrado`);
    } catch (error: any) {
        return serverError(res, error.toString());
    }
};

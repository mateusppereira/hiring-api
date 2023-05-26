import { NextFunction, Request, Response } from 'express';
import { UserType } from '../../../models/user';
import { badRequestError, serverError } from '../../../shared/utils/helpers';

export const checkIfIsAdminValidator = (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = JSON.parse(req.headers['user']?.toString() ?? '{}');

        if (user.tipo !== UserType.Admin) {
            return badRequestError(res, 'Unauthorized access to this profile', 405);
        }

        return next();
    } catch (error: any) {
        return serverError(res, error.toString());
    }
};

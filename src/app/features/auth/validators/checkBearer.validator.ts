import { NextFunction, Request, Response } from 'express';
import { badRequestError, serverError } from '../../../shared/utils/helpers';

export const checkBearerValidator = (req: Request, res: Response, next: NextFunction) => {
    try {
        const bearer = req.cookies.Authorization.split(' ')[0];

        if (!bearer || bearer !== 'Bearer') {
            return badRequestError(res, 'Access denied! Token structure is not valid');
        }

        return next();
    } catch (error: any) {
        return serverError(res, error.toString());
    }
};

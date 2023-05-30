import { NextFunction, Request, Response } from 'express';
import { badRequestError, serverError } from '../../../shared/utils/helpers';

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return badRequestError(res, 'email nao informado');
        }

        if (!password) {
            return badRequestError(res, 'password nao informada');
        }

        return next();
    } catch (error: any) {
        return serverError(res, error.toString());
    }
};

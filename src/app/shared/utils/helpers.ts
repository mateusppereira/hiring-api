import { Response } from 'express';

export const success = (res: Response, data: any, message?: string, code?: number) => {
    return res.status(code ?? 200).send({
        ok: true,
        data,
        message,
    });
};

export const serverError = (res: Response, message?: string, code?: number) => {
    return res.status(code ?? 500).send({
        ok: false,
        message,
    });
};

export const badRequestError = (res: Response, message?: string, code?: number) => {
    return res.status(code ?? 400).send({
        ok: false,
        message,
    });
};

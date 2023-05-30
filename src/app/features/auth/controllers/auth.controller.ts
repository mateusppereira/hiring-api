import { Request, Response } from 'express';
import { LoginUsecase } from '../usercases/login.usecase';
import { AuthRepository } from '../repository/auth.repository';
import { ApiError } from '../../../shared/utils/api.error';
import { LogoutUsecase } from '../usercases/logout.usecase';

export class AuthController {
    public async refreshToken(req: Request, res: Response) {
        try {
        } catch (error: any) {}
    }
    public async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const result = await new LoginUsecase(new AuthRepository()).execute({
                email,
                password,
            });

            const response = result.data.user;
            return res
                .status(result.code)
                .send({ ...result, data: response })
                .cookie('Authorization', `Bearer ${result.data.token}`, {
                    httpOnly: true,
                    secure: true,
                });
        } catch (error: any) {
            return ApiError.serverError(res, error);
        }
    }
    public async logout(req: Request, res: Response) {
        try {
            const result = await new LogoutUsecase(new AuthRepository()).execute(
                req.cookies.Authorization.split(' ')[1]
            );
            return res.status(result.code).send(result).clearCookie('Authorization');
        } catch (error: any) {
            return ApiError.serverError(res, error);
        }
    }
}

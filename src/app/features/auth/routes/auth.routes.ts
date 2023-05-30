import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { loginValidator } from '../validators/login.validator';
import { checkBearerValidator } from '../validators/checkBearer.validator';

export const authRoutes = () => {
    const router = Router();

    router.post('/', loginValidator, new AuthController().login);
    router.get('/', new AuthController().refreshToken);
    router.delete('/', checkBearerValidator, new AuthController().logout);

    return router;
};

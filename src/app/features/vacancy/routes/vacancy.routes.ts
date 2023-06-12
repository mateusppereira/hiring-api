import { Router } from 'express';
import { VacancyController } from '../controllers/vacancy.controller';

export const vagaRoutes = () => {
    const router = Router();

    router.get('/', new VacancyController().list);
    router.post(
        '/',
        // [checkLoginValidator, checkLoginRecrutadorValidator],
        new VacancyController().create
    );

    return router;
};

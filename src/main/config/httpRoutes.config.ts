import { Express } from 'express';
import { loginRouter } from '../../app/features/login/routes';
import { userRouter } from '../../app/features/user/routes';

export function registerRoutes(app: Express) {
  app.get('/health-check', (req, res) => res.status(200).json({ message: 'Ok' }));

  app.use('/users', userRouter);

  app.use('/login', loginRouter);
}

import { Router } from "express";
import { authenticatedMiddleware } from "../../shared/middlewares/authenticatedMiddleware";
import { createVagaController, findVagaController, listVagasController } from "./controller";
import { isRecrutadorMiddleware } from "../../shared/middlewares/isRecrutadorMiddleware";

const vagaRouter = Router();

vagaRouter.get('/', listVagasController);

vagaRouter.get('/:uuid', authenticatedMiddleware, findVagaController);

vagaRouter.post(
  '/',
  [authenticatedMiddleware, isRecrutadorMiddleware],
  createVagaController,
);

export { vagaRouter };

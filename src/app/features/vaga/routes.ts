import { Router } from "express";
import { listVagasController } from "./controller";

const vagaRouter = Router();

vagaRouter.get('/', listVagasController);

export { vagaRouter };

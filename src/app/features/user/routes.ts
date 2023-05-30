import { Router } from "express";
import { createUserController, findUserController, listUsersController } from "./controller";

const userRouter = Router();

userRouter.post('/', createUserController);

userRouter.get('/', listUsersController);

userRouter.get('/:uuid', findUserController);

export { userRouter };

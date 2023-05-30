import { Request, Response } from "express";
import { NotFoundError } from "../../shared/exceptions/notFoundError";
import { UnauthorizedError } from "../../shared/exceptions/unauthorizedError";
import { ValidationError } from "../../shared/exceptions/validationError";
import { UserRepository } from "../user/repository";
import { LoginUsecase } from "./loginUsecase";
import { validateLoginData } from "./validator";
import jwt from 'jsonwebtoken';

export const loginController = async (req: Request, res: Response) => {
  try {
    const loginData = validateLoginData(req.body);

    const userRepository = new UserRepository();
    const loginUsecase = new LoginUsecase(userRepository);
    const loggedUser = await loginUsecase.execute(loginData);

    if (!loggedUser) throw new UnauthorizedError('Usuário não autorizado');

    const token = jwt.sign(
      JSON.stringify(loggedUser),
      process.env.MY_SECRET_KEY_JWT as string,
    );

    return res.status(200).send({ token });
  } catch (error) {
    if (error instanceof ValidationError ||
        error instanceof NotFoundError ||
        error instanceof UnauthorizedError) {
      return error.respond(res);
    }
    return res.status(500).send({});
  }
}

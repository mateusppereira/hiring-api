import { Request, Response } from "express";
import { UserRepository } from "./repository";
import { validateCreateUser } from "./validators";
import { CreateUserUsecase } from "./usecases/createUserUsecase";


export const createUserController = async (req: Request, res: Response) => {
  try {
    const userToCreate = validateCreateUser(req.body);

    const userRepository = new UserRepository();
    const createUserUsecase = new CreateUserUsecase(userRepository);
    const createdUser = await createUserUsecase.execute(userToCreate);

    return res.status(201).send(createdUser);
  } catch (error) {
    console.log(error);
    return res.status(500).send({});
  }
}

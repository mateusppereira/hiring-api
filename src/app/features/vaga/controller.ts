import { Request, Response } from "express";
import { User } from "../../models/user";
import { handleControllerError } from "../../shared/exceptions";
import { UnauthorizedError } from "../../shared/exceptions/unauthorizedError";
import { VagaRepository } from "./repository";
import { CreateVagaUsecase } from "./usecases/createVagaUsecase";
import { validateCreateVaga } from "./validators";
import { ValidationError } from "../../shared/exceptions/validationError";
import { NotFoundError } from "../../shared/exceptions/notFoundError";
import { FindVagaUsecase } from "./usecases/findVagaUsecase";

export const listVagasController = async (req: Request, res: Response) => {
  try {
    const repository = new VagaRepository();
    const allVagas = await repository.listAllVagas();
    return res.status(200).send(allVagas);
  } catch (error) {
    handleControllerError(error, res);
  }
}

export const createVagaController = async (req: Request, res: Response) => {
  try {
    const { authenticatedUser } = req.body;
    if (!(authenticatedUser instanceof User)) throw new UnauthorizedError('Usuário não autenticado');

    const vagaToCreate = validateCreateVaga(req.body);

    const vagaRepository = new VagaRepository();
    const createVagaUsecase = new CreateVagaUsecase(vagaRepository);
    const createdVaga = await createVagaUsecase.execute(vagaToCreate, authenticatedUser);

    return res.status(201).send(createdVaga);
  } catch (error) {
    handleControllerError(error, res);
  }
}

export const findVagaController = async (req: Request, res: Response) => {
  try {
    if (!req.params.uuid) throw new ValidationError('UUID não informado');

    const vagaRepository = new VagaRepository();
    const findVagaUsecase = new FindVagaUsecase(vagaRepository);
    const vagaFound = await findVagaUsecase.execute(req.params.uuid);

    if (!vagaFound) throw new NotFoundError('Vaga não encontrada');

    return res.status(200).send(vagaFound);
  } catch (error) {
    handleControllerError(error, res);
  }
}
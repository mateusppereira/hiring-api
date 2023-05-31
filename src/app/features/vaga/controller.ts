import { Request, Response } from "express";
import { VagaRepository } from "./repository";

export const listVagasController = async (req: Request, res: Response) => {
  try {
    const repository = new VagaRepository();
    const allVagas = await repository.listAllVagas();
    return res.status(200).send(allVagas);
  } catch (error) {
    return res.status(500).send({ message: 'Ocorreu um erro' });
  }
}

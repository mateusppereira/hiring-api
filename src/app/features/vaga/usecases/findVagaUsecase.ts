import { Vaga } from "../../../models/vaga";
import { VagaRepository } from "../repository";

export class FindVagaUsecase {
  constructor(private repository: VagaRepository) {}

  async execute(uuid: string): Promise<Vaga | null> {
    const vaga = await this.repository.find(uuid);
    return vaga;
  }
}
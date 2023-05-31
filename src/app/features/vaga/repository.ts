import { Repository } from "typeorm";
import { DatabaseConnection } from "../../../main/database";
import { VagaEntity } from "../../shared/database/entites/vaga.entity";

export class VagaRepository {
  private vagaRepository: Repository<VagaEntity>;

  constructor() {
    this.vagaRepository = DatabaseConnection.client.manager.getRepository(VagaEntity);
  }

  listAllVagas() : Promise<VagaEntity[]> {
    return this.vagaRepository.find();
  }
}
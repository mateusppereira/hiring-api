import { User } from "../../../models/user";
import { UserRepository } from "../repository";

export interface UserToCreateDTO {
  name: string
  email: string
  senha: string
  nomeEmpresa?: string
  tipo: 'candidato' | 'admin' | 'recrutador'
}

export class CreateUserUsecase {
  constructor(private repository: UserRepository) {}

  async execute(userToCreate: UserToCreateDTO): Promise<User> {
    return this.repository.create(userToCreate);
  }
}
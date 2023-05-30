import { User } from "../../../models/user";
import { UserRepository } from "../repository";

export type UserTipo = 'candidato' | 'admin' | 'recrutador';

export interface UserToCreateDTO {
  name: string
  email: string
  senha: string
  nomeEmpresa?: string
  tipo: UserTipo
}

export class CreateUserUsecase {
  constructor(private repository: UserRepository) {}

  async execute(userToCreate: UserToCreateDTO): Promise<User> {
    return this.repository.create(userToCreate);
  }
}
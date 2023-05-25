import { Repository } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { DatabaseConnection } from "../../../main/database";
import { User } from "../../models/user";
import { UserEntity } from "../../shared/database/entites/user.entity";
import { UserToCreateDTO } from "./usecases/createUserUsecase";

export class UserRepository {
  private userRepository: Repository<UserEntity>;

  constructor() {
    this.userRepository = DatabaseConnection.client.manager.getRepository(UserEntity);
  }

  async create(userToCreate: UserToCreateDTO): Promise<User> {
    const createdUser = await this.userRepository.save({
      uuid: uuidv4(),
      ...userToCreate
    });

    return new User(
      createdUser.uuid,
      createdUser.name,
      createdUser.email,
      createdUser.senha,
      createdUser.nomeEmpresa,
      createdUser.tipo,
    );
  }
}
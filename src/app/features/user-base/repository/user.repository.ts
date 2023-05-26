import { DatabaseConnection } from '../../../../main/database/database.connection';
import { User, UserType } from '../../../models/user';
import { UserEntity } from '../../../shared/database/entites/user.entity';

export class UserBaseRepository {
    private repository = DatabaseConnection.client.getRepository(UserEntity);

    public async create(user: User) {
        const userEntity = this.repository.create({
            uuid: user.uuid,
            name: user.name,
            email: user.email,
            password: user.password,
            companyName: user.companyName,
            tipo: user.tipo,
        });
        const result = await this.repository.save(userEntity);
        return UserBaseRepository.mapEntityModel(result);
    }

    public async listAll() {
        const result = await this.repository.find();
        return result.map((user) => UserBaseRepository.mapEntityModel(user));
    }

    public async list(tipo?: UserType) {
        const result = await this.repository.findBy({
            tipo,
        });
        return result.map((user) => UserBaseRepository.mapEntityModel(user));
    }
    public async findUser(name: string, email: string) {
        const result = await this.repository.findOneBy({
            name,
            email,
        });
        if (!result) return null;
        return UserBaseRepository.mapEntityModel(result);
    }

    public async getByUUID(uuid: string) {
        const result = await this.repository.findOneBy({
            uuid,
        });
        if (!result) return null;

        return UserBaseRepository.mapEntityModel(result);
    }

    public static mapEntityModel(entity: UserEntity): User {
        return User.create(
            entity.uuid,
            entity.name,
            entity.email,
            entity.password,
            entity.tipo,
            entity.companyName
        );
    }
}

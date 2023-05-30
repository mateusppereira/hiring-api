import { DatabaseConnection } from '../../../../main/database/database.connection';
import { BlackListEntity } from '../../../shared/database/entites/blackList.entity';
import { UserEntity } from '../../../shared/database/entites/user.entity';
import { WhiteListEntity } from '../../../shared/database/entites/whiteList.entity';
import { UserBaseRepository } from '../../user-base/repository/user.repository';

export class AuthRepository {
    private userRepository = DatabaseConnection.client.getRepository(UserEntity);
    private whiteList = DatabaseConnection.client.getRepository(WhiteListEntity);
    private blackList = DatabaseConnection.client.getRepository(BlackListEntity);

    public async findUserByLogin(email: string, password: string) {
        const result = await this.userRepository.findOneBy({
            email,
            password,
        });
        if (!result) return null;
        return UserBaseRepository.mapEntityModel(result);
    }

    // TODO: metodos de lista branca de token

    public async addTokeninWhiteList(token: string) {
        const savedtoken = await this.whiteList.save({ token });
        if (!savedtoken) {
            return false;
        }
        return true;
    }
    public async findTokeninWhiteList(token: string) {
        const istoken = await this.whiteList.findOneBy({ token });
        if (!istoken) {
            return false;
        }
        return istoken;
    }
    public async deleteTokeninWhiteList(token: string) {
        const istoken = await this.whiteList.delete({ token });
        console.log(istoken);
    }

    // TODO: metodos de lista negra de token

    public async addTokeninBlackList(token: string) {
        const savedtoken = await this.blackList.save({ token });
        if (!savedtoken) {
            return false;
        }
        return true;
    }
    public async findTokeninBlackList(token: string) {
        const istoken = await this.blackList.findOneBy({ token });
        if (!istoken) {
            return false;
        }
        return istoken;
    }
}

import { CacheRepository } from '../../../shared/database/cache-repository';
import { Return } from '../../../shared/utils/return.contract';
import { UserBaseRepository } from '../../user-base/repository/user.repository';

export class AdminSeeksAllUsersUseCase {
    constructor(private repository: UserBaseRepository, private cache: CacheRepository) {}

    public async execute(): Promise<Return> {
        const allCache = await this.cache.get(`messages:all`);

        if (allCache) {
            return {
                ok: true,
                data: allCache,
                code: 200,
                message: 'Successfully created list of users!',
            };
        }
        const result = await this.repository.listAll();
        if (!result) {
            return {
                ok: false,
                data: result,
                code: 404,
                message: 'No users were found or do not exist!',
            };
        }

        await this.cache.set(`messages:all`, result);
        return {
            ok: true,
            data: result,
            code: 200,
            message: 'Successfully created list of users!',
        };
    }
}

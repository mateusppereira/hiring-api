import { Return } from '../../../shared/utils/return.contract';
import { UserBaseRepository } from '../../user-base/repository/user.repository';

export class AdminSeeksAllUsersUseCase {
    constructor(private repository: UserBaseRepository) {}

    public async execute(): Promise<Return> {
        const result = await this.repository.listAll();
        if (!result) {
            return {
                ok: false,
                data: result,
                code: 404,
                message: 'No users were found or do not exist!',
            };
        }
        return {
            ok: true,
            data: result.map((user) => user.toJson()),
            code: 200,
            message: 'Successfully created list of users!',
        };
    }
}

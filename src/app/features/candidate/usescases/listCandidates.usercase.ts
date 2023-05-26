import { UserType } from '../../../models/user';
import { Return } from '../../../shared/utils/return.contract';
import { UserBaseRepository } from '../../user-base/repository/user.repository';

export class ListCandidatesUsecase {
    constructor(private repository: UserBaseRepository) {}

    public async execute(): Promise<Return> {
        const result = await this.repository.list(UserType.Candidate);

        if (!result) {
            return {
                ok: false,
                data: result,
                code: 404,
                message: 'No candidates were found or do not exist!',
            };
        }
        return {
            ok: true,
            data: result,
            code: 200,
            message: 'Successfully created list of candidates!',
        };
    }
}

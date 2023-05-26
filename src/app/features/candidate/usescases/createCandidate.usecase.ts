import { Candidate } from '../../../models/candidate';
import { Return } from '../../../shared/utils/return.contract';
import { UserBaseRepository } from '../../user-base/repository/user.repository';

interface CreatedCandidateDTO {
    name: string;
    email: string;
    password: string;
}

export class CreateCandidateUseCase {
    constructor(private repository: UserBaseRepository) {}

    public async execute(data: CreatedCandidateDTO): Promise<Return> {
        const admin = new Candidate(data.name, data.email, data.password);
        const result = await this.repository.create(admin);
        return {
            ok: true,
            code: 201,
            message: 'Candidate successfully created',
            data: result.toJson(),
        };
    }
}

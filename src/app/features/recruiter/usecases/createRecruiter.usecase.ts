import { Recruiter } from '../../../models/recruiter';
import { Return } from '../../../shared/utils/return.contract';
import { UserBaseRepository } from '../../user-base/repository/user.repository';

interface CreatedRecruiterDTO {
    name: string;
    email: string;
    password: string;
    companyName: string;
}

export class CreateRecruiterUseCase {
    constructor(private repository: UserBaseRepository) {}

    public async execute(data: CreatedRecruiterDTO): Promise<Return> {
        const recruiter = new Recruiter(data.name, data.email, data.password, data.companyName);
        const result = await this.repository.create(recruiter);
        return {
            ok: true,
            code: 201,
            message: 'Recruiter successfully created',
            data: result.toJson(),
        };
    }
}

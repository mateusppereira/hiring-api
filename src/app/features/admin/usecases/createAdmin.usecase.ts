import { Admin } from '../../../models/admin';
import { Return } from '../../../shared/utils/return.contract';
import { UserBaseRepository } from '../../user-base/repository/user.repository';

interface CreatedAdminDTO {
    name: string;
    email: string;
    password: string;
    companyName?: string;
}

export class CreateAdminUseCase {
    constructor(private repository: UserBaseRepository) {}

    public async execute(data: CreatedAdminDTO): Promise<Return> {
        const admin = new Admin(data.name, data.email, data.password, data.companyName);
        const result = await this.repository.create(admin);
        return {
            ok: true,
            code: 201,
            message: 'Admin successfully created',
            data: result,
        };
    }
}

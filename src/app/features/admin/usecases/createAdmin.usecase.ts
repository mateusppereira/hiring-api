import { Admin } from '../../../models/admin';
import { UserBaseRepository } from '../../user-base/repository/user.repository';

interface CreatedAdminDTO {
    uuid: string;
    name: string;
    email: string;
    password: string;
    companyName?: string;
}

export class CreateAdminUseCase {
    constructor(private repository: UserBaseRepository) {}

    public async execute(data: CreatedAdminDTO) {
        const admin = new Admin(data.name, data.email, data.password, data.companyName);
        const result = await this.repository.create(admin);
        return (result as Admin).toJsonAdmin();
    }
}

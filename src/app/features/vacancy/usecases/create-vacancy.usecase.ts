import { UserType } from '../../../models/user';
import { Vacancy } from '../../../models/vacancy';
import { UserBaseRepository } from '../../user-base/repository/user.repository';
import { VacancyRepository } from '../repository/vacancy';

interface CreateVacancyDTO {
    description: string;
    companyName: string;
    dtLimite: Date;
    indActive: boolean;
    recruiter: string;
    maxCandidates?: number;
}

export class CreateVacancyUsecase {
    constructor(
        private repository: VacancyRepository,
        private userRepository: UserBaseRepository
    ) {}

    public async execute(data: CreateVacancyDTO) {
        if (data.dtLimite < new Date()) {
            return {
                ok: false,
                code: 400,
                message: 'A data deve ser superior a data atual',
            };
        }

        if (data.indActive === undefined) {
            data.indActive = true;
        }
        const recruiter = await this.userRepository.getByUUID(data.recruiter);
        if (!recruiter) {
            return {
                ok: false,
                code: 404,
                message: 'A data deve ser superior a data atual',
            };
        }

        if (recruiter.tipo !== UserType.Recruiter) {
            return {
                ok: false,
                code: 400,
                message: 'A vaga deve ser criada por um recrutador',
            };
        }

        console.log(recruiter);

        const newVacancy = new Vacancy(
            data.description,
            data.companyName,
            data.dtLimite,
            data.indActive,
            recruiter,
            data.maxCandidates
        );

        console.log(newVacancy);

        await this.repository.create(newVacancy);

        return {
            ok: true,
            code: 201,
            message: 'A vaga foi criada com sucesso',
            data: newVacancy,
        };
    }
}

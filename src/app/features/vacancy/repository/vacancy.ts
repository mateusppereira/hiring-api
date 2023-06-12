import { DatabaseConnection } from '../../../../main/database/database.connection';
import { VacancyEntity } from '../../../shared/database/entites/vacancy.entity';
import { Vacancy } from '../../../models/vacancy';
import { UserBaseRepository } from '../../user-base/repository/user.repository';

export class VacancyRepository {
    private repository = DatabaseConnection.client.getRepository(VacancyEntity);

    public async create(data: Vacancy) {
        const newVacancy = this.repository.create({
            uuid: data.uuid,
            description: data.description,
            companyName: data.companyName,
            dtLimite: data.dtLimite,
            indActive: data.indActive,
            maxCandidates: data.maxCandidates,
            uuidRecruiter: data.recruiter.uuid,
        });
        await this.repository.save(newVacancy);
    }

    public async list() {
        const result = await this.repository.find({
            relations: ['recruiter'],
        });

        return result.map((item) => VacancyRepository.mapEntityToModel(item));
    }

    public async get(uuid: string) {
        const result = await this.repository.findOne({
            where: {
                uuid,
            },
            relations: ['recruiter'],
        });

        if (result === null) {
            return null;
        }

        return VacancyRepository.mapEntityToModel(result);
    }

    public static mapEntityToModel(entity: VacancyEntity): Vacancy {
        const recrutador = UserBaseRepository.mapEntityModel(entity.recruiter);

        const vaga = Vacancy.create(
            entity.uuid,
            entity.description,
            entity.companyName,
            entity.dtLimite,
            entity.indActive,
            recrutador,
            entity.maxCandidates
        );

        return vaga;
    }
}

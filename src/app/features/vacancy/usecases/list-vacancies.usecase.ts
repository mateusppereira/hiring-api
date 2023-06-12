import { Return } from '../../../shared/utils/return.contract';
import { VacancyRepository } from '../repository/vacancy';

export class ListVacanciesUsecase {
    public async execute(): Promise<Return> {
        const repository = new VacancyRepository();
        const result = await repository.list();

        return {
            ok: true,
            code: 200,
            message: 'Vagas listadas com sucesso',
            data: result,
        };
    }
}

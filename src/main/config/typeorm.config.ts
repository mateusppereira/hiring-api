import { DataSource, DataSourceOptions } from 'typeorm';
import { UserEntity } from '../../app/shared/database/entites/user.entity';
import { CreateUsersTable1684974494369 } from '../../app/shared/database/migrations/1684974494369-CreateUsersTable';
import { appEnv } from '../../app/envs/app.env';
import { VacancyEntity } from '../../app/shared/database/entites/vacancy.entity';
import { VacantCandidateEntity } from '../../app/shared/database/entites/vacantCandidate.entity';
import { CreatedTables1685061043533 } from '../../app/shared/database/migrations/1685061043533-CreatedTables';

export const config: DataSourceOptions = {
    type: 'postgres',
    url: appEnv.db,
    logging: true,
    ssl: { rejectUnauthorized: false },
    schema: 'hiring',
    entities: [UserEntity, VacancyEntity, VacantCandidateEntity],
    migrations: [CreatedTables1685061043533],
};

export const dataSource = new DataSource(config);

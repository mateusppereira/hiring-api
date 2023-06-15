import { DataSource, DataSourceOptions } from 'typeorm';
import { UserEntity } from '../../app/shared/database/entites/user.entity';
import { CreateUsersTable1684974494369 } from '../../app/shared/database/migrations/1684974494369-CreateUsersTable';
import { appEnv } from '../../app/envs/app.env';
import { VacancyEntity } from '../../app/shared/database/entites/vacancy.entity';
import { VacantCandidateEntity } from '../../app/shared/database/entites/vacantCandidate.entity';
import { CreatedTables1685061043533 } from '../../app/shared/database/migrations/1685061043533-CreatedTables';
import { WhiteListEntity } from '../../app/shared/database/entites/whiteList.entity';
import { BlackListEntity } from '../../app/shared/database/entites/blackList.entity';
import { TokenTable1685461975711 } from '../../app/shared/database/migrations/1685461975711-tokenTable';
import { TestMigration1686789013354 } from '../../../tests/app/shared/migrations/1686789013354-TestMigration';

let config: DataSourceOptions = {
    type: 'postgres',
    url: appEnv.db,
    logging: true,
    ssl: { rejectUnauthorized: false },
    // schema: 'hiring',
    entities: [WhiteListEntity, BlackListEntity], //[UserEntity, VacancyEntity, VacantCandidateEntity],
    migrations: [TokenTable1685461975711], //[CreatedTables1685061043533],
};

if (process.env.NODE_ENV === 'test') {
    config = {
        type: 'sqlite',
        database: './dbtest.sqlite',
        logging: true,
        synchronize: false,
        entities: [
            UserEntity,
            VacancyEntity,
            VacantCandidateEntity,
            WhiteListEntity,
            BlackListEntity,
        ],
        migrations: [TestMigration1686789013354],
    };
}

export const dataSource = new DataSource(config);
export { config };

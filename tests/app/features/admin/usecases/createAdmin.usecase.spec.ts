import { CreateAdminUseCase } from '../../../../../src/app/features/admin/usecases/createAdmin.usecase';
import { UserBaseRepository } from '../../../../../src/app/features/user-base/repository/user.repository';
import { DatabaseConnection } from '../../../../../src/main/database/database.connection';
import { Return } from '../../../../../src/app/shared/utils/return.contract';
describe('create user type admin usecase test', () => {
    jest.mock('../../../../../src/app/features/user-base/repository/user.repository.ts');
    const makeSut = () => {
        const sut = new CreateAdminUseCase(new UserBaseRepository());
        return sut;
    };

    beforeAll(async () => await DatabaseConnection.connect());
    afterAll(async () => await DatabaseConnection.disconnect());

    beforeEach(() => jest.clearAllMocks());

    test('should return promisse type Return ', async () => {
        const sut = makeSut();

        const result = await sut.execute({
            name: 'james',
            email: '<EMAIL>',
            password: '<PASSWORD>',
            companyName: 'é nois LTDA',
        });
        expect(result).toBeTruthy();
    });
});

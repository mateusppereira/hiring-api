import { CreateAdminUseCase } from '../../../../../src/app/features/admin/usecases/createAdmin.usecase';
import { UserBaseRepository } from '../../../../../src/app/features/user-base/repository/user.repository';

describe('create user type admin usecase test', () => {
    beforeEach(() => jest.clearAllMocks());

    test('should return promisse type Return ', async () => {
        // const sut = makeSut();

        const adminData = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
            companyName: 'Example Company',
        };

        const adminRepositoryMock = {
            create: jest.fn().mockResolvedValue(adminData),
        };

        const createAdminUseCase = new CreateAdminUseCase(
            adminRepositoryMock as unknown as UserBaseRepository
        );

        const result = await createAdminUseCase.execute(adminData);
        expect(result.ok).toBeTruthy();
        expect(result.code).toBe(201);
        expect(result.message).toBe('Admin successfully created');
        expect(result.data).toEqual({ ...adminData, tipo: result.data.tipo });
        expect(adminRepositoryMock.create).toHaveBeenCalledWith(expect.anything());
    });
});

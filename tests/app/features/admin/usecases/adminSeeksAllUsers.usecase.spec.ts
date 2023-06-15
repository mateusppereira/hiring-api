import { randomUUID } from 'node:crypto';
import { AdminSeeksAllUsersUseCase } from '../../../../../src/app/features/admin/usecases/adminSeeksAllUsers.usecase';
import { UserBaseRepository } from '../../../../../src/app/features/user-base/repository/user.repository';
import { UserType } from '../../../../../src/app/models/user';

describe('AdminSeeksAllUsersUseCase test', () => {
    beforeEach(() => jest.clearAllMocks());

    test('deve retornar erro se nao tiver usuarios', async () => {
        const userRepositoryMock = {
            listAll: jest.fn().mockResolvedValue(null),
        };

        const adminSeeksAllUsersUseCase = new AdminSeeksAllUsersUseCase(
            userRepositoryMock as unknown as UserBaseRepository
        );

        const result = await adminSeeksAllUsersUseCase.execute();

        expect(result.ok).toBeFalsy();
        expect(result.code).toEqual(404);
        expect(result.message).toEqual('No users were found or do not exist!');
        expect(result.data).toBeNull();
        expect(userRepositoryMock.listAll).toHaveBeenCalled();
    });

    test('deve retornar uma lista de usuarios', async () => {
        const userList = [
            {
                uuid: randomUUID(),
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
                companyName: 'Example Company',
                type: UserType.Admin,
            },
            {
                uuid: randomUUID(),
                name: 'John 2',
                email: 'john2@example.com',
                password: 'password',
                companyName: 'Example Company',
                type: UserType.Recruiter,
            },
            {
                uuid: randomUUID(),
                name: 'John Doeteste',
                email: 'john@2example.com',
                password: 'password1233',
                companyName: 'Example Company',
                type: UserType.Candidate,
            },
        ];

        const userRepositoryMock = {
            listAll: jest.fn().mockResolvedValue(userList),
        };

        const adminSeeksAllUsersUseCase = new AdminSeeksAllUsersUseCase(
            userRepositoryMock as unknown as UserBaseRepository
        );

        const result = await adminSeeksAllUsersUseCase.execute();

        expect(result.ok).toBeTruthy();
        expect(result.code).toEqual(200);
        expect(result.message).toEqual('Successfully created list of users!');
        expect(result.data).toEqual(userList);
        expect(userRepositoryMock.listAll).toHaveBeenCalled();
    });
});

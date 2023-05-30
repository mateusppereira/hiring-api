import { JwtAdapter } from '../../../shared/utils/jwt.adapter';
import { Return } from '../../../shared/utils/return.contract';
import { AuthRepository } from '../repository/auth.repository';

interface LoginDTO {
    email: string;
    password: string;
}

export class LoginUsecase {
    constructor(private repository: AuthRepository) {}
    public async execute(data: LoginDTO): Promise<Return> {
        const { email, password } = data;
        const result = await this.repository.findUserByLogin(email, password);
        if (!result) {
            return {
                ok: false,
                data: result,
                code: 404,
                message: 'No user were found or do not exist!',
            };
        }

        const user = result.toJson();
        const generateToken = JwtAdapter.createToken(user);
        await this.repository.addTokeninWhiteList(generateToken);
        return {
            ok: true,
            data: { user, token: generateToken },
            code: 200,
            message: 'Login success',
        };
    }
}

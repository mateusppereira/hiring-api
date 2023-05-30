import { JwtAdapter } from '../../../shared/utils/jwt.adapter';
import { Return } from '../../../shared/utils/return.contract';
import { AuthRepository } from '../repository/auth.repository';

export class LogoutUsecase {
    constructor(private repository: AuthRepository) {}
    public async execute(token: string): Promise<Return> {
        const result = await this.repository.findTokeninWhiteList(token);
        if (!result) {
            return {
                ok: false,
                data: [],
                code: 400,
                message: "you aren't connecting!",
            };
        }

        await this.repository.addTokeninBlackList(result.token);
        await this.repository.deleteTokeninWhiteList(result.token);

        return {
            ok: true,
            data: [],
            code: 200,
            message: 'Logout success',
        };
    }
}

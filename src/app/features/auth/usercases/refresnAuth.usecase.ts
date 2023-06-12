import { JwtAdapter } from '../../../shared/utils/jwt.adapter';
import { Return } from '../../../shared/utils/return.contract';
import { AuthRepository } from '../repository/auth.repository';

export interface CheckLoginDTO {
    uuid: string;
    name: string;
    email: string;
    company: string;
    type: string;
    exp?: number;
}

export class refreshAuthUsecase {
    constructor(private repository: AuthRepository) {}
    public async execute(token: string): Promise<Return> {
        const user = JwtAdapter.decodeToken<CheckLoginDTO>(token);
        const { uuid, name, email, company, type } = user;
        const inBlackList = await this.repository.findTokeninBlackList(token);
        if (!inBlackList) {
            const inWhiteList = await this.repository.findTokeninWhiteList(token);
            if (!inWhiteList) {
                return {
                    ok: false,
                    code: 418,
                    message: 'Token is Not exist',
                };
            }
            if (user.exp && user.exp < Date.now() / 1000) {
                await this.repository.addTokeninBlackList(token);
                await this.repository.deleteTokeninWhiteList(token);

                const newToken = JwtAdapter.createToken({ uuid, name, email, company, type }, 1000);
                await this.repository.addTokeninWhiteList(newToken);
                return {
                    ok: true,
                    data: { user: { uuid, name, email, company, type }, token: newToken },
                    code: 200,
                    message: 'New token generated',
                };
            }
            return {
                ok: true,
                data: { user: { uuid, name, email, company, type }, token },
                code: 200,
                message: 'authorized',
            };
        }
        return {
            ok: false,
            data: '',
            code: 200,
            message: 'Unauthorized',
        };
    }
}

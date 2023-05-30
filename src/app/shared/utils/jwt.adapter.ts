import jwt from 'jsonwebtoken';
import { appEnv } from '../../envs/app.env';

export class JwtAdapter {
    public static createToken(data: any, exp?: number) {
        let token;
        if (exp) {
            token = jwt.sign(data, appEnv.secret as string, { expiresIn: `${exp}s` });
        } else {
            token = jwt.sign(data, appEnv.secret as string);
        }
        return token;
    }

    public static decodeToken<T>(token: string) {
        const decoded = jwt.verify(token, appEnv.secret as string);

        return decoded as T;
    }
}

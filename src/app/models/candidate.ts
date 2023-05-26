import { User, UserType } from './user';

export class Candidate extends User {
    constructor(name: string, email: string, password: string) {
        super(name, email, password, UserType.Candidate);
    }
}

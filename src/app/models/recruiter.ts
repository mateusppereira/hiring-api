import { User, UserType } from './user';

export class Recruiter extends User {
    constructor(name: string, email: string, password: string, companyName?: string) {
        super(name, email, password, UserType.Recruiter, companyName);
    }
}

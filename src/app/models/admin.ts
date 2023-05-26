import { User, UserType } from './user';

export class Admin extends User {
    constructor(name: string, email: string, password: string, companyName?: string) {
        super(name, email, password, UserType.Admin, companyName);
    }

    public toJsonAdmin() {
        return {
            uuid: this.uuid,
            name: this.name,
            email: this.email,
            company: this.companyName,
        };
    }
}

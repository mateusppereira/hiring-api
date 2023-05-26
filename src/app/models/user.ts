import { v4 as generateUUID } from 'uuid';

export enum UserType {
    Admin = 'A',
    Candidate = 'C',
    Recruiter = 'R',
}

export class User {
    private _uuid: string;
    constructor(
        private _name: string,
        private _email: string,
        private _password: string,
        private _tipo: UserType,
        private _companyName?: string
    ) {
        this._uuid = generateUUID();
    }

    public get uuid() {
        return this._uuid;
    }
    public get name() {
        return this._name;
    }
    public get email() {
        return this._email;
    }
    public get password() {
        return this._password;
    }
    public get companyName() {
        return this._companyName;
    }
    public get tipo() {
        return this._tipo;
    }

    public static create(
        uuid: string,
        name: string,
        email: string,
        password: string,
        tipo: UserType,
        companyName?: string
    ) {
        const user = new User(name, email, password, tipo, companyName);
        user._uuid = uuid;
        return user;
    }

    public toJson() {
        return {
            uuid: this.uuid,
            name: this.name,
            email: this.email,
            company: this.companyName,
            type: this.tipo,
        };
    }
}

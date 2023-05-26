import { v4 as generateUUID } from 'uuid';
import { Recruiter } from './recruiter';

export class Vacancy {
    private _uuid: string;

    constructor(
        public description: string,
        public companyName: string,
        public dtLimite: Date,
        public indActive: boolean,
        public recruiter: Recruiter,
        public maxCandidates?: number
    ) {
        this._uuid = generateUUID();
    }

    public get uuid() {
        return this._uuid;
    }

    public static create(
        uuid: string,
        description: string,
        companyName: string,
        dtLimite: Date,
        indActive: boolean,
        recruiter: Recruiter,
        maxCandidates?: number
    ) {
        const vacancy = new Vacancy(
            description,
            companyName,
            dtLimite,
            indActive,
            recruiter,
            maxCandidates
        );
        vacancy._uuid = uuid;

        return vacancy;
    }
}

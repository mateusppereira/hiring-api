import { v4 as generateUUID } from 'uuid';
import { Recruiter } from './recruiter';
import { Candidate } from './candidate';
import { Vacancy } from './vacancy';

export class VacantCandidate {
    private _uuid: string;

    constructor(
        public dtCadastre: Date,
        public indSuccess: boolean,
        public candidate: Candidate,
        public vacancy: Vacancy
    ) {
        this._uuid = generateUUID();
    }

    public get uuid() {
        return this._uuid;
    }

    public static create(
        uuid: string,
        dtCadastre: Date,
        indSuccess: boolean,
        candidate: Candidate,
        vacancy: Vacancy
    ) {
        const vacantCandidate = new VacantCandidate(dtCadastre, indSuccess, candidate, vacancy);
        vacantCandidate._uuid = uuid;

        return vacantCandidate;
    }
}

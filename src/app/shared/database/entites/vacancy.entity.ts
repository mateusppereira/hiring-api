import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'vacancy' })
export class VacancyEntity {
    @PrimaryColumn({ name: 'vacancy_uuid' })
    uuid: string;

    @Column({ name: 'vacancy_description' })
    description: string;

    @Column({ name: 'vacancy_company_name' })
    companyName: string;

    @Column({ name: 'vacancy_dtLimite' })
    dtLimite: Date;

    @Column({ name: 'vacancy_indActive', default: true })
    indActive: boolean;

    @Column({ name: 'vacancy_max_candidates', nullable: true })
    maxCandidates: number;

    @Column({ name: 'vacancy_uuid_recruiter' })
    uuidRecruiter: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'uuidRecruiter' })
    recruiter: UserEntity;

    @CreateDateColumn({ name: 'vacancy_dthr_cadastre' })
    dthrCadastre: Date;
}

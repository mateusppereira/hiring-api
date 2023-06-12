import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { VacancyEntity } from './vacancy.entity';

@Entity({ name: 'vacant_candidate' })
export class VacantCandidateEntity {
    @PrimaryColumn({ name: 'vacant_candidate_uuid' })
    uuid: string;

    @Column({ name: 'vacant_candidate_description' })
    description: string;

    @CreateDateColumn({ name: 'vacant_candidate_dt_cadastre' })
    dtCadastre: Date;

    @Column({ name: 'vacant_candidate_indSuccess', default: false })
    indSuccess: boolean;

    @Column({ name: 'vacant_candidate_uuid_candidate' })
    uuidCandidate?: string;
    @Column({ name: 'vacant_candidate_uuid_vacancy' })
    uuidVacancy: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: ' uuidCandidate' })
    candidate: UserEntity;

    @ManyToOne(() => VacancyEntity)
    @JoinColumn({ name: ' uuidVacancy' })
    vacancy: VacancyEntity;
}

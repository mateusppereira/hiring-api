import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { UserType } from '../../../models/user';

@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryColumn({ name: 'user_uuid' })
    uuid: string;

    @Column({ name: 'user_name' })
    name: string;

    @Column({ name: 'user_email' })
    email: string;

    @Column({ name: 'user_password', select: false })
    password: string;

    @Column({ name: 'user_company_name', nullable: true })
    companyName: string;

    @Column({ name: 'user_tipo', type: 'varchar', length: 1, enum: ['A', 'C', 'R'] })
    tipo: UserType;

    @CreateDateColumn({ name: 'user_dthr_cadastre' })
    dthrCadastre: Date;
}

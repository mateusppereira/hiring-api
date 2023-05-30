import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid';

@Entity({ name: 'whitelist' })
export class WhiteListEntity {
    @PrimaryColumn({ name: 'whitelist_uuid' })
    uuid: string;

    @Column({ name: 'whitelist_token' })
    token: string;

    @CreateDateColumn({ name: 'whitelist_created_at' })
    createdAt: Date;

    @BeforeInsert()
    beforeInsert() {
        this.uuid = v4();
        this.createdAt = new Date();
    }
}

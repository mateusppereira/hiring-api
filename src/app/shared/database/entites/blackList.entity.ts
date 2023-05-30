import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid';

@Entity({ name: 'blacklist' })
export class BlackListEntity {
    @PrimaryColumn({ name: 'blacklist_uuid' })
    uuid: string;

    @Column({ name: 'blacklist_token' })
    token: string;

    @CreateDateColumn({ name: 'blacklist_created_at' })
    createdAt: Date;

    @BeforeInsert()
    beforeInsert() {
        this.uuid = v4();
        this.createdAt = new Date();
    }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class TokenTable1685461975711 implements MigrationInterface {
    name = 'TokenTable1685461975711';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "whitelist" ("whitelist_uuid" character varying NOT NULL, "whitelist_token" character varying NOT NULL, "whitelist_created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d4938a94d35c338ca49452bbe49" PRIMARY KEY ("whitelist_uuid"))`
        );
        await queryRunner.query(
            `CREATE TABLE "blacklist" ("blacklist_uuid" character varying NOT NULL, "blacklist_token" character varying NOT NULL, "blacklist_created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d04e97d5a72715630d81e10554e" PRIMARY KEY ("blacklist_uuid"))`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "blacklist"`);
        await queryRunner.query(`DROP TABLE "whitelist"`);
    }
}

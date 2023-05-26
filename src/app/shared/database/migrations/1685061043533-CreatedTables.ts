import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedTables1685061043533 implements MigrationInterface {
    name = 'CreatedTables1685061043533'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("user_uuid" character varying NOT NULL, "user_name" character varying NOT NULL, "user_email" character varying NOT NULL, "user_password" character varying NOT NULL, "user_company_name" character varying, "user_tipo" character varying(1) NOT NULL, "user_dthr_cadastre" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_20ba1ec1283433fc53a5311f165" PRIMARY KEY ("user_uuid"))`);
        await queryRunner.query(`CREATE TABLE "vacancy" ("vacancy_uuid" character varying NOT NULL, "vacancy_description" character varying NOT NULL, "vacancy_company_name" character varying NOT NULL, "vacancy_dtLimite" TIMESTAMP NOT NULL, "vacancy_indActive" boolean NOT NULL DEFAULT true, "vacancy_max_candidates" integer, "vacancy_uuid_recruiter" character varying NOT NULL, "vacancy_dthr_cadastre" TIMESTAMP NOT NULL DEFAULT now(), "uuidRecruiter" character varying, CONSTRAINT "PK_86459e6dbb55343551045475556" PRIMARY KEY ("vacancy_uuid"))`);
        await queryRunner.query(`CREATE TABLE "vacant_candidate" ("vacant_candidate_uuid" character varying NOT NULL, "vacant_candidate_description" character varying NOT NULL, "vacant_candidate_dt_cadastre" TIMESTAMP NOT NULL DEFAULT now(), "vacant_candidate_indSuccess" boolean NOT NULL DEFAULT false, "vacant_candidate_uuid_candidate" character varying NOT NULL, "vacant_candidate_uuid_vacancy" character varying NOT NULL, " uuidCandidate" character varying, " uuidVacancy" character varying, CONSTRAINT "PK_dff3b031cc439cec48af7b3a1fc" PRIMARY KEY ("vacant_candidate_uuid"))`);
        await queryRunner.query(`ALTER TABLE "vacancy" ADD CONSTRAINT "FK_4e13dd4222712e4cf4c90057ac0" FOREIGN KEY ("uuidRecruiter") REFERENCES "user"("user_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vacant_candidate" ADD CONSTRAINT "FK_37ac7985840d937cc942cf6f824" FOREIGN KEY (" uuidCandidate") REFERENCES "user"("user_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vacant_candidate" ADD CONSTRAINT "FK_485ddd95eafe3380ccfef553c49" FOREIGN KEY (" uuidVacancy") REFERENCES "vacancy"("vacancy_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vacant_candidate" DROP CONSTRAINT "FK_485ddd95eafe3380ccfef553c49"`);
        await queryRunner.query(`ALTER TABLE "vacant_candidate" DROP CONSTRAINT "FK_37ac7985840d937cc942cf6f824"`);
        await queryRunner.query(`ALTER TABLE "vacancy" DROP CONSTRAINT "FK_4e13dd4222712e4cf4c90057ac0"`);
        await queryRunner.query(`DROP TABLE "vacant_candidate"`);
        await queryRunner.query(`DROP TABLE "vacancy"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}

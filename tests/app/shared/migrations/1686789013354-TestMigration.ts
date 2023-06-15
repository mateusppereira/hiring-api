import { MigrationInterface, QueryRunner } from "typeorm";

export class TestMigration1686789013354 implements MigrationInterface {
    name = 'TestMigration1686789013354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("user_uuid" varchar PRIMARY KEY NOT NULL, "user_name" varchar NOT NULL, "user_email" varchar NOT NULL, "user_password" varchar NOT NULL, "user_company_name" varchar, "user_tipo" varchar CHECK( "user_tipo" IN ('A','C','R') ) NOT NULL, "user_dthr_cadastre" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "vacancy" ("vacancy_uuid" varchar PRIMARY KEY NOT NULL, "vacancy_description" varchar NOT NULL, "vacancy_company_name" varchar NOT NULL, "vacancy_dtLimite" datetime NOT NULL, "vacancy_indActive" boolean NOT NULL DEFAULT (1), "vacancy_max_candidates" integer, "vacancy_uuid_recruiter" varchar NOT NULL, "vacancy_dthr_cadastre" datetime NOT NULL DEFAULT (datetime('now')), "uuidRecruiter" varchar)`);
        await queryRunner.query(`CREATE TABLE "vacant_candidate" ("vacant_candidate_uuid" varchar PRIMARY KEY NOT NULL, "vacant_candidate_description" varchar NOT NULL, "vacant_candidate_dt_cadastre" datetime NOT NULL DEFAULT (datetime('now')), "vacant_candidate_indSuccess" boolean NOT NULL DEFAULT (0), "vacant_candidate_uuid_candidate" varchar NOT NULL, "vacant_candidate_uuid_vacancy" varchar NOT NULL, " uuidCandidate" varchar, " uuidVacancy" varchar)`);
        await queryRunner.query(`CREATE TABLE "whitelist" ("whitelist_uuid" varchar PRIMARY KEY NOT NULL, "whitelist_token" varchar NOT NULL, "whitelist_created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "blacklist" ("blacklist_uuid" varchar PRIMARY KEY NOT NULL, "blacklist_token" varchar NOT NULL, "blacklist_created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_vacancy" ("vacancy_uuid" varchar PRIMARY KEY NOT NULL, "vacancy_description" varchar NOT NULL, "vacancy_company_name" varchar NOT NULL, "vacancy_dtLimite" datetime NOT NULL, "vacancy_indActive" boolean NOT NULL DEFAULT (1), "vacancy_max_candidates" integer, "vacancy_uuid_recruiter" varchar NOT NULL, "vacancy_dthr_cadastre" datetime NOT NULL DEFAULT (datetime('now')), "uuidRecruiter" varchar, CONSTRAINT "FK_4e13dd4222712e4cf4c90057ac0" FOREIGN KEY ("uuidRecruiter") REFERENCES "user" ("user_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_vacancy"("vacancy_uuid", "vacancy_description", "vacancy_company_name", "vacancy_dtLimite", "vacancy_indActive", "vacancy_max_candidates", "vacancy_uuid_recruiter", "vacancy_dthr_cadastre", "uuidRecruiter") SELECT "vacancy_uuid", "vacancy_description", "vacancy_company_name", "vacancy_dtLimite", "vacancy_indActive", "vacancy_max_candidates", "vacancy_uuid_recruiter", "vacancy_dthr_cadastre", "uuidRecruiter" FROM "vacancy"`);
        await queryRunner.query(`DROP TABLE "vacancy"`);
        await queryRunner.query(`ALTER TABLE "temporary_vacancy" RENAME TO "vacancy"`);
        await queryRunner.query(`CREATE TABLE "temporary_vacant_candidate" ("vacant_candidate_uuid" varchar PRIMARY KEY NOT NULL, "vacant_candidate_description" varchar NOT NULL, "vacant_candidate_dt_cadastre" datetime NOT NULL DEFAULT (datetime('now')), "vacant_candidate_indSuccess" boolean NOT NULL DEFAULT (0), "vacant_candidate_uuid_candidate" varchar NOT NULL, "vacant_candidate_uuid_vacancy" varchar NOT NULL, " uuidCandidate" varchar, " uuidVacancy" varchar, CONSTRAINT "FK_37ac7985840d937cc942cf6f824" FOREIGN KEY (" uuidCandidate") REFERENCES "user" ("user_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_485ddd95eafe3380ccfef553c49" FOREIGN KEY (" uuidVacancy") REFERENCES "vacancy" ("vacancy_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_vacant_candidate"("vacant_candidate_uuid", "vacant_candidate_description", "vacant_candidate_dt_cadastre", "vacant_candidate_indSuccess", "vacant_candidate_uuid_candidate", "vacant_candidate_uuid_vacancy", " uuidCandidate", " uuidVacancy") SELECT "vacant_candidate_uuid", "vacant_candidate_description", "vacant_candidate_dt_cadastre", "vacant_candidate_indSuccess", "vacant_candidate_uuid_candidate", "vacant_candidate_uuid_vacancy", " uuidCandidate", " uuidVacancy" FROM "vacant_candidate"`);
        await queryRunner.query(`DROP TABLE "vacant_candidate"`);
        await queryRunner.query(`ALTER TABLE "temporary_vacant_candidate" RENAME TO "vacant_candidate"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vacant_candidate" RENAME TO "temporary_vacant_candidate"`);
        await queryRunner.query(`CREATE TABLE "vacant_candidate" ("vacant_candidate_uuid" varchar PRIMARY KEY NOT NULL, "vacant_candidate_description" varchar NOT NULL, "vacant_candidate_dt_cadastre" datetime NOT NULL DEFAULT (datetime('now')), "vacant_candidate_indSuccess" boolean NOT NULL DEFAULT (0), "vacant_candidate_uuid_candidate" varchar NOT NULL, "vacant_candidate_uuid_vacancy" varchar NOT NULL, " uuidCandidate" varchar, " uuidVacancy" varchar)`);
        await queryRunner.query(`INSERT INTO "vacant_candidate"("vacant_candidate_uuid", "vacant_candidate_description", "vacant_candidate_dt_cadastre", "vacant_candidate_indSuccess", "vacant_candidate_uuid_candidate", "vacant_candidate_uuid_vacancy", " uuidCandidate", " uuidVacancy") SELECT "vacant_candidate_uuid", "vacant_candidate_description", "vacant_candidate_dt_cadastre", "vacant_candidate_indSuccess", "vacant_candidate_uuid_candidate", "vacant_candidate_uuid_vacancy", " uuidCandidate", " uuidVacancy" FROM "temporary_vacant_candidate"`);
        await queryRunner.query(`DROP TABLE "temporary_vacant_candidate"`);
        await queryRunner.query(`ALTER TABLE "vacancy" RENAME TO "temporary_vacancy"`);
        await queryRunner.query(`CREATE TABLE "vacancy" ("vacancy_uuid" varchar PRIMARY KEY NOT NULL, "vacancy_description" varchar NOT NULL, "vacancy_company_name" varchar NOT NULL, "vacancy_dtLimite" datetime NOT NULL, "vacancy_indActive" boolean NOT NULL DEFAULT (1), "vacancy_max_candidates" integer, "vacancy_uuid_recruiter" varchar NOT NULL, "vacancy_dthr_cadastre" datetime NOT NULL DEFAULT (datetime('now')), "uuidRecruiter" varchar)`);
        await queryRunner.query(`INSERT INTO "vacancy"("vacancy_uuid", "vacancy_description", "vacancy_company_name", "vacancy_dtLimite", "vacancy_indActive", "vacancy_max_candidates", "vacancy_uuid_recruiter", "vacancy_dthr_cadastre", "uuidRecruiter") SELECT "vacancy_uuid", "vacancy_description", "vacancy_company_name", "vacancy_dtLimite", "vacancy_indActive", "vacancy_max_candidates", "vacancy_uuid_recruiter", "vacancy_dthr_cadastre", "uuidRecruiter" FROM "temporary_vacancy"`);
        await queryRunner.query(`DROP TABLE "temporary_vacancy"`);
        await queryRunner.query(`DROP TABLE "blacklist"`);
        await queryRunner.query(`DROP TABLE "whitelist"`);
        await queryRunner.query(`DROP TABLE "vacant_candidate"`);
        await queryRunner.query(`DROP TABLE "vacancy"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}

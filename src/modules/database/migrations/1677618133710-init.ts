import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1677618133710 implements MigrationInterface {
  name = 'init1677618133710';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Resources" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cb2d1b1fe8da812b2406657ccfa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "categoryId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_61aa7408a426fea5dd8416f5a12" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" "public"."Categories_type_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_537b5c00afe7427c4fc9434cd59" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ResourceTags" ("resourcesId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_1f27471d17f66744e6eed865737" PRIMARY KEY ("resourcesId", "tagsId"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_3c16587f8f4c284467837efc31" ON "ResourceTags" ("resourcesId") `);
    await queryRunner.query(`CREATE INDEX "IDX_a68896db01d4ea5c8fa3645b65" ON "ResourceTags" ("tagsId") `);
    await queryRunner.query(
      `ALTER TABLE "Tags" ADD CONSTRAINT "FK_18434d1e0110b07d56a1d32f5dd" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ResourceTags" ADD CONSTRAINT "FK_3c16587f8f4c284467837efc310" FOREIGN KEY ("resourcesId") REFERENCES "Resources"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "ResourceTags" ADD CONSTRAINT "FK_a68896db01d4ea5c8fa3645b65b" FOREIGN KEY ("tagsId") REFERENCES "Tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ResourceTags" DROP CONSTRAINT "FK_a68896db01d4ea5c8fa3645b65b"`);
    await queryRunner.query(`ALTER TABLE "ResourceTags" DROP CONSTRAINT "FK_3c16587f8f4c284467837efc310"`);
    await queryRunner.query(`ALTER TABLE "Tags" DROP CONSTRAINT "FK_18434d1e0110b07d56a1d32f5dd"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_a68896db01d4ea5c8fa3645b65"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_3c16587f8f4c284467837efc31"`);
    await queryRunner.query(`DROP TABLE "ResourceTags"`);
    await queryRunner.query(`DROP TABLE "Users"`);
    await queryRunner.query(`DROP TABLE "Categories"`);
    await queryRunner.query(`DROP TABLE "Tags"`);
    await queryRunner.query(`DROP TABLE "Resources"`);
  }
}

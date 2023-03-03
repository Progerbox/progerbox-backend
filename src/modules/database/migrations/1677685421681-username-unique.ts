import { MigrationInterface, QueryRunner } from 'typeorm';

export class usernameUnique1677685421681 implements MigrationInterface {
  name = 'usernameUnique1677685421681';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "UQ_ffc81a3b97dcbf8e320d5106c0d" UNIQUE ("username")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "UQ_ffc81a3b97dcbf8e320d5106c0d"`);
  }
}

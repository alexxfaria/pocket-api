import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePartners1642003091281 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'partners',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'phone',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'admin',
            type: 'boolean',
            default: false,
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cnpj_cpf',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'number',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'complements',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'district',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'state',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'country',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'zip',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'contact',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'landline',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'id_plan',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'stop_ads',
            type: 'boolean',
            default: false,
          },
          {
            name: 'all_ads',
            type: 'boolean',
            default: true,
          },
          {
            name: 'active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('partners');
  }
}

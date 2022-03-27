import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAds1648345841558 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'ads',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'color',
            type: 'varchar',
          },
          {
            name: 'measure',
            type: 'varchar',
          },
          {
            name: 'max_price',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'ideal_amount',
            type: 'int',
          },
          {
            name: 'min_amount',
            type: 'int',
          },
          {
            name: 'max_amount',
            type: 'int',
          },
          {
            name: 'limit_date',
            type: 'timestamp',
          },
          {
            name: 'validity_check',
            type: 'timestamp',
          },
          {
            name: 'id_partner',
            type: 'uuid',
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
    await queryRunner.dropTable('max');
  }
}

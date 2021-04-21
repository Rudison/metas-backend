import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFeriados1618004854989 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Feriados',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true
          },
          {
            name: 'descricao',
            type: 'varchar'
          },
          {
            name: 'dia',
            type: 'date'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Feriados');
  }
}

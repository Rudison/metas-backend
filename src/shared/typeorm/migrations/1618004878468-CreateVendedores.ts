import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateVendedores1618004878468 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Vendedores',
        columns: [
          {
            name: 'id',
            type: 'int',
            generationStrategy: 'increment',
            isPrimary: true,
            isGenerated: true
          },
          {
            name: 'codVendBlue',
            type: 'char(5)'
          },
          {
            name: 'nome',
            type: 'varchar'
          },
          {
            name: 'ativo',
            type: 'boolean'
          },
          {
            name: 'outros',
            type: 'boolean'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Vendedores');
  }
}

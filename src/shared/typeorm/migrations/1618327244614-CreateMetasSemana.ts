import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMetasSemana1618327244614 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'MetasSemana',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true
          },
          {
            name: 'metaId',
            type: 'int'
          },
          {
            name: 'semanaId',
            type: 'int'
          },
          {
            name: 'dataInicial',
            type: 'date'
          },
          {
            name: 'dataFinal',
            type: 'date'
          },
          {
            name: 'diasAdicionais',
            type: 'int'
          }
        ],
        foreignKeys: [
          {
            name: 'Metas_MetasSemanas',
            referencedTableName: 'Metas',
            referencedColumnNames: ['id'],
            columnNames: ['metaId']
          },
          {
            name: 'MetasSemanas_Semanas',
            referencedTableName: 'Semanas',
            referencedColumnNames: ['id'],
            columnNames: ['semanaId']
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('MetasSemana');
  }
}

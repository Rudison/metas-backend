import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMetasVendedorSemana1618327289237
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'MetasVendedorSemana',
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
            name: 'metaSemanaId',
            type: 'int'
          },
          {
            name: 'vendedorId',
            type: 'int'
          },
          {
            name: 'valorRealizado',
            type: 'decimal',
            precision: 10,
            scale: 2
          },
          {
            name: 'valorPrevisto',
            type: 'decimal',
            precision: 10,
            scale: 2
          },
          {
            name: 'percentual',
            type: 'int'
          }
        ],
        foreignKeys: [
          {
            name: 'MetaVendSem_Metas',
            referencedTableName: 'Metas',
            referencedColumnNames: ['id'],
            columnNames: ['metaId']
          },
          {
            name: 'MetaVendSem_MetasSemana',
            referencedTableName: 'MetasSemana',
            referencedColumnNames: ['id'],
            columnNames: ['metaSemanaId']
          },
          {
            name: 'MetaVendSem_Vendedores',
            referencedTableName: 'Vendedores',
            referencedColumnNames: ['id'],
            columnNames: ['vendedorId']
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('MetasVendedorSemana');
  }
}

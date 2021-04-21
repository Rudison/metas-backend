import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMetasVendedorMes1618327269530 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'MetasVendedorMes',
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
            name: 'vendedorId',
            type: 'int'
          },
          {
            name: 'valorMetaMensal',
            type: 'decimal',
            precision: 10,
            scale: 2
          }
        ],
        foreignKeys: [
          {
            name: 'MetaVendMes_Metas',
            referencedTableName: 'Metas',
            referencedColumnNames: ['id'],
            columnNames: ['metaId']
          },
          {
            name: 'MetaVendMes_Vendedores',
            referencedTableName: 'Vendedores',
            referencedColumnNames: ['id'],
            columnNames: ['vendedorId']
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('MetasVendedorMes');
  }
}

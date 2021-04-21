import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMetas1618327181132 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Metas',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true
          },
          {
            name: 'mesId',
            type: 'int'
          },
          {
            name: 'ano',
            type: 'int'
          },
          {
            name: 'valorMetaMensal',
            type: 'decimal',
            precision: 10,
            scale: 2
          },
          {
            name: 'valorMetaRealizadoMensal',
            type: 'decimal',
            precision: 10,
            scale: 2,
            default: 0,
            isNullable: true
          },
          {
            name: 'percentual',
            type: 'int',
            default: 0,
            isNullable: true
          },
          {
            name: 'semanasNoMes',
            type: 'int',
            default: 0,
            isNullable: true
          },
          {
            name: 'diasUteis',
            type: 'int',
            default: 0,
            isNullable: true
          }
        ],
        foreignKeys: [
          {
            name: 'MetasMes',
            referencedTableName: 'Meses',
            referencedColumnNames: ['id'],
            columnNames: ['mesId']
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Metas');
  }
}

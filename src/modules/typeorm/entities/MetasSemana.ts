import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('MetasSemana', { database: 'apimetas' })
class MetasSemana {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  metaId: number;

  @Column()
  semanaId: number;

  @Column()
  dataInicial: Date;

  @Column()
  dataFinal: Date;

  @Column({ nullable: true })
  diasUteisSemana: number;
}
export default MetasSemana;

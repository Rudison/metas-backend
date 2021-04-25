import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import Metas from './Metas';

@Entity('MetasSemana')
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

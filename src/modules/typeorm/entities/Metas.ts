import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import Meses from './Meses';
import MetasSemana from './MetasSemana';
import MetasVendedorMes from './MetasVendedorMes';
import MetasVendedorSemana from './MetasVendedorSemana';

@Entity('Metas')
class Metas {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  mesId: number;

  @Column()
  ano: number;

  @Column()
  valorMetaMensal: number;

  @Column({ nullable: true })
  valorMetaRealizadoMensal: number;

  @Column({ nullable: true })
  percentual: number;

  @Column({ nullable: true })
  semanasNoMes: number;

  @Column({ nullable: true })
  diasUteisMes: number;

  @OneToMany(
    type => Meses,
    mes => {
      mes.id;
    }
  )
  @JoinTable({
    name: 'MetasMes',
    joinColumns: [{ name: 'id' }],
    inverseJoinColumns: [{ name: 'mesId' }]
  })
  meses: Meses[];
}
export default Metas;

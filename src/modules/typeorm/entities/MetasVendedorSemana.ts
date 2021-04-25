import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import MetasVendedorMes from './MetasVendedorMes';
import Vendedor from './Vendedor';

@Entity('MetasVendedorSemana')
class MetasVendedorSemana {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  metaId: number;

  @Column()
  metaSemanaId: number;

  @Column()
  vendedorId: number;

  @Column()
  valorRealizado: number;

  @Column()
  valorPrevisto: number;

  @Column()
  percentual: number;

  @OneToMany(
    type => Vendedor,
    vendedor => {
      vendedor.id;
    }
  )
  @JoinTable({
    name: 'MetaVendSem_Vendedores',
    joinColumns: [{ name: 'id' }],
    inverseJoinColumns: [{ name: 'vendedorId' }]
  })
  vendedores: MetasVendedorMes[];
}
export default MetasVendedorSemana;

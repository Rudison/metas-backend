import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import MetasVendedorMes from './MetasVendedorMes';

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

  @ManyToMany(
    type => MetasVendedorMes,
    vendedor => {
      vendedor.vendedorId;
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

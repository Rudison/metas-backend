import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import MetasVendedorSemana from './MetasVendedorSemana';

@Entity('MetasVendedorMes')
class MetasVendedorMes {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  metaId: number;

  @Column()
  vendedorId: number;

  @Column()
  valorMetaMensal: number;

  @ManyToMany(type => MetasVendedorSemana, vendedor => vendedor.vendedorId)
  @JoinTable({
    name: 'MetaVendMes_Vendedores',
    joinColumns: [{ name: 'id' }],
    inverseJoinColumns: [{ name: 'vendedorId' }]
  })
  vendedores: MetasVendedorSemana[];
}
export default MetasVendedorMes;

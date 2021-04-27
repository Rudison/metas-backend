import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import Vendedor from './Vendedor';

@Entity('MetasVendedorMes', { database: 'apimetas' })
class MetasVendedorMes {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  metaId: number;

  @Column()
  vendedorId: number;

  @Column()
  valorMetaMensal: number;

  @OneToMany(type => Vendedor, vendedor => vendedor.id)
  @JoinTable({
    name: 'MetaVendMes_Vendedores',
    joinColumns: [{ name: 'id' }],
    inverseJoinColumns: [{ name: 'vendedorId' }]
  })
  vendedores: Vendedor[];
}
export default MetasVendedorMes;

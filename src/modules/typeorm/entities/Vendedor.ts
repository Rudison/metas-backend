import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import MetasVendedorMes from './MetasVendedorMes';
import MetasVendedorSemana from './MetasVendedorSemana';

@Entity('Vendedores')
class Vendedor {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  codVendBlue: string;

  @Column()
  nome: string;

  @Column()
  ativo: boolean;

  @Column()
  outros: boolean;
}
export default Vendedor;

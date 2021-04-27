import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Vendedores', { database: 'apimetas' })
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

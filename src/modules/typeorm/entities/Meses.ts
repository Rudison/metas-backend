import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Meses')
class Meses {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  descricao: string;
}
export default Meses;

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Semanas')
class Semanas {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  descricao: string;
}
export default Semanas;

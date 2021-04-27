import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Semanas', { database: 'apimetas' })
class Semanas {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  descricao: string;
}
export default Semanas;

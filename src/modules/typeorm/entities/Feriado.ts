import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Feriados', { database: 'apimetas' })
class Feriado {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  descricao: string;

  @Column('date')
  dia: Date;
}

export default Feriado;

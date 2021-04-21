import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Feriados')
class Feriado {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  descricao: string;

  @Column('date')
  dia: Date;
}

export default Feriado;

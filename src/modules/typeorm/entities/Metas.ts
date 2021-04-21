import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Metas')
class Metas {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  mesId: number;

  @Column()
  ano: number;

  @Column()
  valorMetaMensal: number;

  @Column({ nullable: true })
  valorMetaRealizadoMensal: number;

  @Column({ nullable: true })
  percentual: number;

  @Column({ nullable: true })
  semanasNoMes: number;

  @Column({ nullable: true })
  diasUteisMes: number;
}
export default Metas;

import { EntityRepository, Repository } from 'typeorm';
import Feriado from '../entities/Feriado';

@EntityRepository(Feriado)
export class FeriadoRepository extends Repository<Feriado> {
  public async findAll(): Promise<Feriado[]> {
    const feriado = this.find();

    return feriado;
  }

  public async findByDate(dia: Date): Promise<Feriado | undefined> {
    const feriado = this.findOne({
      where: { dia }
    });

    return feriado;
  }
}

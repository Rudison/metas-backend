import { EntityRepository, Repository } from 'typeorm';
import Meses from '../entities/Meses';

@EntityRepository(Meses)
export class MesRepository extends Repository<Meses> {
  public async findAll(): Promise<Meses[]> {
    const meses = this.find();

    return meses;
  }

  public async findById(id: string): Promise<Meses | undefined> {
    const mes = this.findOne({
      where: { id }
    });

    return mes;
  }
}

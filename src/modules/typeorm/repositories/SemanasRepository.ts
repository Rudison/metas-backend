import { EntityRepository, Repository } from 'typeorm';
import Semanas from '../entities/Semanas';

@EntityRepository(Semanas)
export class SemanasRepository extends Repository<Semanas> {
  public async findAll(): Promise<Semanas[]> {
    const semanas = this.find();

    return semanas;
  }

  public async findById(id: string): Promise<Semanas | undefined> {
    const mes = this.findOne({
      where: { id }
    });

    return mes;
  }
}

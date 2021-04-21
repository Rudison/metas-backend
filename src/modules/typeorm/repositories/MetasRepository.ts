import { EntityRepository, Repository } from 'typeorm';
import Metas from '../entities/Metas';

@EntityRepository(Metas)
export class MetasRepository extends Repository<Metas> {
  public async findById(id: string): Promise<Metas | undefined> {
    const meta = this.findOne({
      where: { id }
    });

    return meta;
  }

  public async findByYear(ano: string): Promise<Metas[] | undefined> {
    const meta = this.find({
      where: { ano }
    });

    return meta;
  }

  public async findByMonthYear(
    mesId: number,
    ano: number
  ): Promise<Metas | undefined> {
    const metas = this.findOne({
      where: { mesId, ano }
    });

    return metas;
  }
}

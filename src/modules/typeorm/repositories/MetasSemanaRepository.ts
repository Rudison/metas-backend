import { EntityRepository, Repository } from 'typeorm';
import MetasSemana from '../entities/MetasSemana';

@EntityRepository(MetasSemana)
export class MetasSemanaRepository extends Repository<MetasSemana> {
  public async findById(id: string): Promise<MetasSemana | undefined> {
    const metaSemana = this.findOne({
      where: { id }
    });

    return metaSemana;
  }

  public async findByMetaId(metaId: number): Promise<MetasSemana | undefined> {
    const meta = this.findOne({
      where: { metaId }
    });

    return meta;
  }

  public async findByMetaSemanaId(
    metaId: number,
    semanaId: number
  ): Promise<MetasSemana | undefined> {
    const meta = this.findOne({
      where: { metaId, semanaId }
    });

    return meta;
  }

  public async findByMetasSemanasId(
    metaId: number,
    semanaId: number
  ): Promise<MetasSemana[] | undefined> {
    const meta = this.find({
      where: { metaId, semanaId }
    });

    return meta;
  }
}

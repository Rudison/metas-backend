import { EntityRepository, Repository } from 'typeorm';
import MetasVendedorSemana from '../entities/MetasVendedorSemana';

@EntityRepository(MetasVendedorSemana)
export class MetasVendSemRepository extends Repository<MetasVendedorSemana> {
  public async findById(id: string): Promise<MetasVendedorSemana | undefined> {
    const meta = this.findOne({
      where: { id }
    });

    return meta;
  }

  public async findByMetaVendId(
    metaId: string,
    vendedorId: string
  ): Promise<MetasVendedorSemana | undefined> {
    const meta = this.findOne({
      where: { metaId, vendedorId }
    });

    return meta;
  }

  public async findByMetaSemanaVendedorId(
    metaSemanaId: number,
    vendedorId: number
  ): Promise<MetasVendedorSemana | undefined> {
    const meta = this.findOne({
      where: { metaSemanaId, vendedorId }
    });

    return meta;
  }

  public async findUpdatesMetasId(
    metaId: string,
    metaSemanaId: string
  ): Promise<MetasVendedorSemana[] | undefined> {
    const meta = this.find({
      where: { metaId, metaSemanaId }
    });

    return meta;
  }
}

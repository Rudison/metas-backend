import { EntityRepository, Repository } from 'typeorm';
import MetasVendedorMes from '../entities/MetasVendedorMes';

@EntityRepository(MetasVendedorMes)
export class MetasVendMesRepository extends Repository<MetasVendedorMes> {
  public async findById(id: string): Promise<MetasVendedorMes | undefined> {
    const meta = this.findOne({
      where: { id }
    });

    return meta;
  }
  public async findByMetaId(
    metaId: string
  ): Promise<MetasVendedorMes[] | undefined> {
    const meta = this.find({
      where: { metaId }
    });

    return meta;
  }

  public async findByMetaVendedor(
    metaId: string,
    vendedorId: string
  ): Promise<MetasVendedorMes | undefined> {
    const meta = this.findOne({
      where: { metaId, vendedorId }
    });

    return meta;
  }
}

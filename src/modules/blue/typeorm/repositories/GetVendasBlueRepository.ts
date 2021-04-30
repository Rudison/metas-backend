import { EntityRepository, Repository } from 'typeorm';
import GetVendasVendedorMeta from '../entities/GetVendasVendedorMeta';

@EntityRepository(GetVendasVendedorMeta)
export class MesRepository extends Repository<GetVendasVendedorMeta> {
  public async getVendaVendedor(
    empresaId: '1',
    dataInicial: Date,
    dataFinal: Date,
    codVendBlue: string
  ): Promise<GetVendasVendedorMeta | undefined> {
    const metas = this.findOne({
      where: { empresaId, dataInicial, dataFinal, codVendBlue }
    });

    return metas;
  }
}

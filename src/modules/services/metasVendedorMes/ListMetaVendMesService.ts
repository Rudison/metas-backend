import MetasVendedorMes from '@modules/typeorm/entities/MetasVendedorMes';
import { MetasVendMesRepository } from '@modules/typeorm/repositories/MetasVendMesRepository';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  metaId: string;
}

class ListMetaVendMesService {
  public async execute(): Promise<MetasVendedorMes[]> {
    const repository = getCustomRepository(MetasVendMesRepository);

    const meta = await repository.find();

    return meta;
  }

  public async executePorMeta({
    metaId
  }: IRequest): Promise<MetasVendedorMes[] | undefined> {
    const repository = getCustomRepository(MetasVendMesRepository);

    const meta = await repository.findByMetaId(metaId);

    return meta;
  }

  public async getVendedoresSelect({
    metaId
  }: IRequest): Promise<MetasVendedorMes[] | undefined> {
    const repository = getCustomRepository(MetasVendMesRepository);

    const vendedoresMeta = await repository
      .createQueryBuilder('a')
      .select('a.id as "id"')
      .addSelect('a."metaId"')
      .addSelect('a."vendedorId"')
      .addSelect('b.nome as "nome"')
      .addSelect('a."valorMetaMensal"')
      .innerJoin('Vendedores', 'b', 'b.id = a."vendedorId"')
      .where('a."metaId" = :metaId', { metaId })
      .orderBy('b.nome')
      .getRawMany();

    return vendedoresMeta;
  }
}

export default ListMetaVendMesService;

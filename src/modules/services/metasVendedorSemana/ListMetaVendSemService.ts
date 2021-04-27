import MetasVendedorSemana from '@modules/typeorm/entities/MetasVendedorSemana';
import { MetasVendSemRepository } from '@modules/typeorm/repositories/MetasVendSemRepository';
import { getConnection } from 'typeorm';

interface IRequest {
  metaId: string;
  semanaId: string;
}
class ListMetaVendSemService {
  public async execute(): Promise<MetasVendedorSemana[]> {
    const conn = getConnection('metasConn');
    const repository = conn.getCustomRepository(MetasVendSemRepository);

    const meta = await repository.find();

    return meta;
  }

  public async getVendedoresMetaSemana({
    metaId,
    semanaId
  }: IRequest): Promise<MetasVendedorSemana[] | undefined> {
    const conn = getConnection('metasConn');
    const repository = conn.getCustomRepository(MetasVendSemRepository);

    const vendedoresMetaSemana = await repository
      .createQueryBuilder('a')
      .select('a.id as "id"')
      .addSelect('a."metaId"')
      .addSelect('a."metaSemanaId"')
      .addSelect('a."vendedorId"')
      .addSelect('b.nome as "nome"')
      .addSelect('a."valorRealizado"')
      .addSelect('a."valorPrevisto"')
      .addSelect('a.percentual as "percentual"')
      .innerJoin('Vendedores', 'b', 'b.id = a."vendedorId"')
      .innerJoin('MetasSemana', 'c', 'c.id = a."metaSemanaId"')
      .where('a."metaId" = :metaId', { metaId })
      .andWhere('c."semanaId" = :semanaId', { semanaId })
      .orderBy('b.nome')
      .getRawMany();

    return vendedoresMetaSemana;
  }
}

export default ListMetaVendSemService;

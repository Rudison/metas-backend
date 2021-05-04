import MetasVendedorSemana from '@modules/typeorm/entities/MetasVendedorSemana';
import { MetasVendSemRepository } from '@modules/typeorm/repositories/MetasVendSemRepository';
import { getConnection } from 'typeorm';

interface IRequest {
  metaId: string;
  semanaId: string;
}
interface IRequestSemana {
  metaId: string;
  vendedorId: string;
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

  public async existeMetaSemana({
    metaId,
    vendedorId
  }: IRequestSemana): Promise<number> {
    const conn = getConnection('metasConn');
    const repository = conn.getCustomRepository(MetasVendSemRepository);

    const id = await repository
      .createQueryBuilder('a')
      .select('a.id as "id"')
      .innerJoin(
        'MetasSemana',
        'b',
        'b."metaId" = a."metaId" and b.id = a."metaSemanaId"'
      )
      .where('a."metaId" = :metaId', { metaId })
      .andWhere('a."vendedorId" = :vendedorId', { vendedorId })
      .andWhere('b."semanaId" = 6')
      .getRawOne();

    const qtd = id == undefined ? 0 : id;
    return qtd;
  }

  public async existeVendedorSemana({
    metaId,
    vendedorId
  }: IRequestSemana): Promise<number> {
    const conn = getConnection('metasConn');
    const repository = conn.getCustomRepository(MetasVendSemRepository);

    const id = await repository
      .createQueryBuilder('a')
      .select('distinct count(*) as "qtd_semana"')
      .innerJoin(
        'MetasSemana',
        'b',
        'b."metaId" = a."metaId" and b.id = a."metaSemanaId"'
      )
      .where('a."metaId" = :metaId', { metaId })
      .andWhere('a."vendedorId" = :vendedorId', { vendedorId })
      .getRawOne();

    const qtd = id == undefined ? 0 : id;
    return qtd;
  }

  public async relatorioMetaSemana({
    metaId,
    semanaId
  }: IRequest): Promise<MetasVendedorSemana[] | undefined> {
    const conn = getConnection('metasConn');
    const repository = conn.getCustomRepository(MetasVendSemRepository);

    const metasSemana = await repository
      .createQueryBuilder('a')
      .select('b."dataInicial"')
      .addSelect('b."dataFinal"')
      .addSelect('d.nome as "vendedor"')
      .addSelect('a."valorRealizado"')
      .addSelect('a."valorPrevisto"')
      .addSelect('a.percentual as "percentual"')
      .innerJoin(
        'MetasSemana',
        'b',
        'b."metaId" = a."metaId" and b.id = a."metaSemanaId"'
      )
      .innerJoin('Semanas', 'c', 'c.id = b."semanaId"')
      .innerJoin('Vendedores', 'd', 'd.id = a."vendedorId"')
      .where('a."metaId" = :metaId', { metaId })
      .andWhere('b."semanaId" = :semanaId', { semanaId })
      .orderBy('d."nome"')
      .getRawMany();

    return metasSemana;
  }
}

export default ListMetaVendSemService;

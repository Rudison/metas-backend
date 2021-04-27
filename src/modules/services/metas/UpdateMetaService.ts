import Metas from '@modules/typeorm/entities/Metas';
import { MetasRepository } from '@modules/typeorm/repositories/MetasRepository';
import { MetasVendSemRepository } from '@modules/typeorm/repositories/MetasVendSemRepository';
import AppError from '@shared/errors/AppError';
import { getConnection } from 'typeorm';
interface IRequest {
  id: string;
  valorMetaMensal: number;
  semanasNoMes: number;
}
interface IRequestPerc {
  id: string;
}
class UpdateMetaService {
  public async execute({
    id,
    valorMetaMensal,
    semanasNoMes
  }: IRequest): Promise<Metas> {
    const conn = getConnection('metasConn');
    const repository = conn.getCustomRepository(MetasRepository);

    const meta = await repository.findOne(id);

    if (!meta) throw new AppError('Meta Não Encontrada!');

    meta.valorMetaMensal = valorMetaMensal;
    meta.semanasNoMes = semanasNoMes;

    await repository.save(meta);

    return meta;
  }

  public async updateValorPercentual({ id }: IRequestPerc): Promise<void> {
    const conn = getConnection('metasConn');
    const repository = conn.getCustomRepository(MetasRepository);

    const meta = await repository.findOne(id);

    if (!meta) throw new AppError('Meta Não Encontrada!');

    const repositoryMetasVendSem = conn.getCustomRepository(
      MetasVendSemRepository
    );

    const vlrRealizadoVendSemanas = await repositoryMetasVendSem
      .createQueryBuilder('a')
      .select('SUM(a."valorRealizado") as "valorMetaRealizadoMensal"')
      .addSelect(
        'ROUND((SUM(a."valorRealizado") / c."valorMetaMensal") * 100) as "percentual"'
      )
      .innerJoin(
        'MetasSemana',
        'b',
        'b."metaId" = a."metaId" and b.id = a."metaSemanaId"'
      )
      .innerJoin('Metas', 'c', 'c.id = b."metaId"')
      .where('a."metaId" = :id', { id })
      .andWhere('b."semanaId" = 6')
      .groupBy('c."valorMetaMensal"')
      .getRawOne();

    meta.valorMetaRealizadoMensal =
      vlrRealizadoVendSemanas.valorMetaRealizadoMensal;
    meta.percentual = vlrRealizadoVendSemanas.percentual;

    await repository.save(meta);
  }
}

export default UpdateMetaService;

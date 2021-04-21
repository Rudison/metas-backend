import { MetasVendSemRepository } from '@modules/typeorm/repositories/MetasVendSemRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  metaId: string;
  metaSemanaId: string;
  metaMensal: boolean;
}

class UpdatePercentualService {
  public async execute({
    metaId,
    metaSemanaId,
    metaMensal
  }: IRequest): Promise<void> {
    const repository = getCustomRepository(MetasVendSemRepository);

    if (!metaMensal) {
      const meta = await repository.findUpdatesMetasId(metaId, metaSemanaId);

      if (!meta) throw new AppError('Meta Semana Vendedor Não Encontrada!');

      meta.forEach(item => {
        item.percentual = +Math.ceil(
          (item.valorRealizado / item.valorPrevisto) * 100
        ).toFixed(0);
      });

      await repository.save(meta);
    } else {
      const meta = await repository.findUpdatesMetasId(metaId, metaSemanaId);

      const vlrRealizadoVendSemanas = await repository
        .createQueryBuilder('a')
        .select('a."vendedorId"')
        .addSelect('sum(a."valorRealizado") as "valorRealizado"')
        .addSelect(
          'ROUND((sum(a."valorRealizado") / c."valorMetaMensal") * 100 ) as "percentual"'
        )
        .innerJoin(
          'MetasSemana',
          'b',
          'b."metaId" = a."metaId" and b.id = a."metaSemanaId"'
        )
        .innerJoin(
          'MetasVendedorMes',
          'c',
          'c."metaId" = b."metaId" and c."vendedorId" = a."vendedorId"'
        )
        .where('a."metaId" = :metaId', { metaId })
        .andWhere('b."semanaId" <> 6')
        .groupBy('a."vendedorId"')
        .addGroupBy('c."valorMetaMensal"')
        .getRawMany();

      meta?.forEach(metas => {
        vlrRealizadoVendSemanas.filter(f => {
          if (f.vendedorId == metas.vendedorId) {
            metas.valorRealizado = f.valorRealizado;
            metas.percentual = f.percentual;
            repository.save(meta);
          }
        });
      });
    }
  }
}

export default UpdatePercentualService;

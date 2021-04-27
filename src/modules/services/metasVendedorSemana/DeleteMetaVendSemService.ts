import MetasVendedorSemana from '@modules/typeorm/entities/MetasVendedorSemana';
import { MetasVendSemRepository } from '@modules/typeorm/repositories/MetasVendSemRepository';
import AppError from '@shared/errors/AppError';
import { getConnection } from 'typeorm';

interface IRequest {
  id: string;
}
interface IRequestAll {
  metaId: string;
}
interface IRequestPorSemana {
  metaId: string;
  vendedorId: string;
}
class DeleteMetaVendSemService {
  public async execute({ id }: IRequest): Promise<void> {
    const conn = getConnection('metasConn');
    const repository = conn.getCustomRepository(MetasVendSemRepository);

    const meta = await repository.findOne(id);

    if (!meta) throw new AppError('Meta Semana Não Encontrada!');

    await repository.remove(meta);
  }

  public async excluirTodosPorMeta({ metaId }: IRequestAll): Promise<void> {
    const conn = getConnection('metasConn');
    const repository = conn.getCustomRepository(MetasVendSemRepository);

    const meta = await repository.findSemanasMetaId(metaId);
    if (!meta) throw new AppError('Meta Semana Não Encontrada!');

    await repository
      .createQueryBuilder()
      .delete()
      .from(MetasVendedorSemana)
      .where('"MetasVendedorSemana"."metaId"  = :metaId', { metaId })
      .execute();
  }

  public async excluirPorSemana({
    metaId,
    vendedorId
  }: IRequestPorSemana): Promise<void> {
    const conn = getConnection('metasConn');
    const repository = conn.getCustomRepository(MetasVendSemRepository);

    const meta = await repository.findSemanasMetaId(metaId);
    if (!meta) throw new AppError('Meta Semana Não Encontrada!');

    await repository
      .createQueryBuilder()
      .delete()
      .from(MetasVendedorSemana)
      .where('"MetasVendedorSemana"."metaId"  = :metaId', { metaId })
      .andWhere('"MetasVendedorSemana"."vendedorId"  = :vendedorId', {
        vendedorId
      })
      .execute();
  }
}
export default DeleteMetaVendSemService;

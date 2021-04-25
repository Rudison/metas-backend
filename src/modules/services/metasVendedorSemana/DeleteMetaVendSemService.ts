import MetasVendedorSemana from '@modules/typeorm/entities/MetasVendedorSemana';
import { MetasVendSemRepository } from '@modules/typeorm/repositories/MetasVendSemRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
}
interface IRequestAll {
  metaId: string;
}

class DeleteMetaVendSemService {
  public async execute({ id }: IRequest): Promise<void> {
    const repository = getCustomRepository(MetasVendSemRepository);

    const meta = await repository.findOne(id);

    if (!meta) throw new AppError('Meta Semana Não Encontrada!');

    await repository.remove(meta);
  }

  public async excluirTodosPorMeta({ metaId }: IRequestAll): Promise<void> {
    const repository = getCustomRepository(MetasVendSemRepository);

    const meta = await repository.findSemanasMetaId(metaId);
    if (!meta) throw new AppError('Meta Semana Não Encontrada!');

    await repository
      .createQueryBuilder()
      .delete()
      .from(MetasVendedorSemana)
      .where('"MetasVendedorSemana"."metaId"  = :metaId', { metaId })
      .execute();
  }
}
export default DeleteMetaVendSemService;

import MetasSemana from '@modules/typeorm/entities/MetasSemana';
import { MetasSemanaRepository } from '@modules/typeorm/repositories/MetasSemanaRepository';
import AppError from '@shared/errors/AppError';
import { getConnection } from 'typeorm';

interface IRequest {
  id: string;
}
interface IRequestAll {
  metaId: string;
}
class DeleteMetaSemanaService {
  public async execute({ id }: IRequest): Promise<void> {
    const conn = getConnection('metasConn');
    const repository = conn.getCustomRepository(MetasSemanaRepository);

    const meta = await repository.findOne(id);

    if (!meta) throw new AppError('Meta Semana Não Encontrada!');

    await repository.remove(meta);
  }

  public async excluirTodosPorMeta({ metaId }: IRequestAll): Promise<void> {
    const conn = getConnection('metasConn');
    const repository = conn.getCustomRepository(MetasSemanaRepository);

    const meta = await repository.findByMetaId(metaId);
    if (!meta) throw new AppError('Meta Semana Não Encontrada!');

    await repository
      .createQueryBuilder()
      .delete()
      .from(MetasSemana)
      .where('"MetasSemana"."metaId"  = :metaId', { metaId })
      .execute();
  }
}
export default DeleteMetaSemanaService;

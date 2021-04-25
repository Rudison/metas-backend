import MetasVendedorMes from '@modules/typeorm/entities/MetasVendedorMes';
import { MetasVendMesRepository } from '@modules/typeorm/repositories/MetasVendMesRepository';
import { MetasVendSemRepository } from '@modules/typeorm/repositories/MetasVendSemRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
  metaId: string;
  vendedorId: string;
}
interface IRequestAll {
  metaId: string;
}
class DeleteMetaVendMesService {
  public async execute({ id, metaId, vendedorId }: IRequest): Promise<void> {
    const repository = getCustomRepository(MetasVendMesRepository);
    const repositoryMetaSemana = getCustomRepository(MetasVendSemRepository);

    const meta = await repository.findById(id);
    if (!meta) throw new AppError('Meta Vendedor Mês Não Encontrado!');

    const existeMetaSemana = await repositoryMetaSemana.findByMetaVendId(
      metaId,
      vendedorId
    );

    if (existeMetaSemana != undefined)
      throw new AppError('Existe alguma Semana Relacionada!');

    await repository.remove(meta);
  }

  public async excluirTodos({ metaId }: IRequestAll): Promise<void> {
    const repository = getCustomRepository(MetasVendMesRepository);

    const meta = await repository.findByMetaId(metaId);

    if (!meta) throw new AppError('Meta Vendedor Mês Não Encontrado!');

    await repository
      .createQueryBuilder()
      .delete()
      .from(MetasVendedorMes)
      .where('"MetasVendedorMes"."metaId"  = :metaId', { metaId })
      .execute();
  }
}
export default DeleteMetaVendMesService;
